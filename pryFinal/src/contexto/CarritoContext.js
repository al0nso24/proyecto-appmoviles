import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from './AuthContext';
import { productoPorId } from '../datos/productos';

export const MAX_UNIDADES = 10;

const CLAVE_INVITADO = 'kuby_carrito_invitado';
const claveDe = (usuario) => (usuario ? `kuby_carrito_${usuario.id}` : CLAVE_INVITADO);
const limitar = (n) => Math.min(MAX_UNIDADES, Math.max(1, n));

async function leerCarrito(clave) {
    try {
        const raw = await AsyncStorage.getItem(clave);
        const lista = raw ? JSON.parse(raw) : [];
        return Array.isArray(lista) ? lista : [];
    } catch {
        return [];
    }
}

function unir(base, extra) {
    const resultado = [...base];
    extra.forEach(({ id, cantidad }) => {
        const i = resultado.findIndex((x) => x.id === id);
        if (i === -1) resultado.push({ id, cantidad: limitar(cantidad) });
        else resultado[i] = { id, cantidad: limitar(resultado[i].cantidad + cantidad) };
    });
    return resultado;
}

const CarritoContext = createContext(null);

export function CarritoProvider({ children }) {
    const { usuario } = useAuth();
    const clave = claveDe(usuario);

    const [carrito, setCarrito] = useState([]);
    const claveCargada = useRef(null);

    useEffect(() => {
        let activo = true;
        claveCargada.current = null;
        setCarrito([]);

        const cargar = async () => {
            let items = await leerCarrito(clave);
            let huboUnion = false;
            if (clave !== CLAVE_INVITADO) {
                const invitado = await leerCarrito(CLAVE_INVITADO);
                if (invitado.length > 0) {
                    items = unir(items, invitado);
                    huboUnion = true;
                }
            }
            if (!activo) return;
            if (huboUnion) {
                try {
                    await AsyncStorage.setItem(clave, JSON.stringify(items));
                    await AsyncStorage.removeItem(CLAVE_INVITADO);
                } catch {}
            }
            claveCargada.current = clave;
            setCarrito(items);
        };
        cargar();
        return () => {
            activo = false;
        };
    }, [clave]);

    useEffect(() => {
        if (claveCargada.current !== clave) return;
        AsyncStorage.setItem(clave, JSON.stringify(carrito)).catch(() => {});
    }, [carrito, clave]);

    // Funciones del carrito (useCallback: se crean una sola vez)
    const agregarAlCarrito = useCallback((producto, cantidad = 1) => {
        setCarrito((actual) => {
            const existe = actual.some((i) => i.id === producto.id);
            if (!existe) return [...actual, { id: producto.id, cantidad: limitar(cantidad) }];
            return actual.map((i) =>
                i.id === producto.id ? { ...i, cantidad: limitar(i.cantidad + cantidad) } : i
            );
        });
    }, []);

    const cambiarCantidad = useCallback((id, cantidad) => {
        setCarrito((actual) => actual.map((i) => (i.id === id ? { ...i, cantidad: limitar(cantidad) } : i)));
    }, []);

    const quitarDelCarrito = useCallback((id) => {
        setCarrito((actual) => actual.filter((i) => i.id !== id));
    }, []);

    const vaciarCarrito = useCallback(() => setCarrito([]), []);

    const items = useMemo(
        () =>
            carrito
                .map(({ id, cantidad }) => {
                    const producto = productoPorId(id);
                    return producto ? { ...producto, cantidad, subtotal: producto.precio * cantidad } : null;
                })
                .filter(Boolean),
        [carrito]
    );
    const total = useMemo(() => items.reduce((suma, i) => suma + i.subtotal, 0), [items]);
    const cantidadTotal = useMemo(() => items.reduce((suma, i) => suma + i.cantidad, 0), [items]);

    const valor = useMemo(
        () => ({ items, total, cantidadTotal, agregarAlCarrito, cambiarCantidad, quitarDelCarrito, vaciarCarrito }),
        [items, total, cantidadTotal, agregarAlCarrito, cambiarCantidad, quitarDelCarrito, vaciarCarrito]
    );

    return <CarritoContext.Provider value={valor}>{children}</CarritoContext.Provider>;
}

export const useCarrito = () => useContext(CarritoContext);
