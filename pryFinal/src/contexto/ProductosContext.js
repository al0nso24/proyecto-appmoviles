import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { IMAGENES } from '../datos/productos';
import { leerProductos, guardarProductos, validarProducto } from '../servicios/productosService';

const ProductosContext = createContext(null);

const conImagen = (p) => ({
    ...p,
    imagen: p.imagenUri ? { uri: p.imagenUri } : IMAGENES[p.imagenKey] || IMAGENES.logo,
});

export function ProductosProvider({ children }) {
    const [lista, setLista] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        leerProductos()
            .then(setLista)
            .finally(() => setCargando(false));
    }, []);

    // Guarda en AsyncStorage y actualiza el estado
    const aplicar = useCallback(async (nueva) => {
        await guardarProductos(nueva);
        setLista(nueva);
    }, []);

    const agregarProducto = useCallback(async (datos, imagenUri) => {
        const valido = validarProducto(datos);
        const id = lista.reduce((max, p) => Math.max(max, p.id), 0) + 1;
        const nuevo = { id, ...valido, ...(imagenUri ? { imagenUri } : { imagenKey: 'logo' }) };
        await aplicar([...lista, nuevo]);
        return nuevo;
    }, [lista, aplicar]);

    const editarProducto = useCallback(async (id, datos, imagenUri) => {
        const valido = validarProducto(datos);
        const nueva = lista.map((p) => {
            if (p.id !== id) return p;
            const editado = { ...p, ...valido };
            if (imagenUri) {
                editado.imagenUri = imagenUri;
            } else if (imagenUri === null) {
                delete editado.imagenUri;
                editado.imagenKey = p.imagenKey || 'logo';
            }
            return editado;
        });
        await aplicar(nueva);
    }, [lista, aplicar]);

    const eliminarProducto = useCallback(async (id) => {
        await aplicar(lista.filter((p) => p.id !== id));
    }, [lista, aplicar]);

    const productos = useMemo(() => lista.map(conImagen), [lista]);
    const productoPorId = useCallback((id) => productos.find((p) => p.id === id), [productos]);

    const valor = useMemo(
        () => ({ productos, cargando, productoPorId, agregarProducto, editarProducto, eliminarProducto }),
        [productos, cargando, productoPorId, agregarProducto, editarProducto, eliminarProducto]
    );

    return <ProductosContext.Provider value={valor}>{children}</ProductosContext.Provider>;
}

export const useProductos = () => useContext(ProductosContext);
