import AsyncStorage from '@react-native-async-storage/async-storage';
import { PRODUCTOS_INICIALES } from '../datos/productos';

const CLAVE_PRODUCTOS = 'kubi_productos';

export async function leerProductos() {
    try {
        const raw = await AsyncStorage.getItem(CLAVE_PRODUCTOS);
        if (raw) {
            const lista = JSON.parse(raw);
            if (Array.isArray(lista)) return lista;
        }
    } catch {}
    await guardarProductos(PRODUCTOS_INICIALES);
    return PRODUCTOS_INICIALES;
}

export async function guardarProductos(lista) {
    await AsyncStorage.setItem(CLAVE_PRODUCTOS, JSON.stringify(lista));
}

export function validarProducto({ nombre, precio, categoria }) {
    const n = String(nombre || '').trim();
    const p = Number(String(precio).replace(',', '.'));
    if (n.length < 2) throw new Error('Ingresa el nombre del producto.');
    if (!categoria) throw new Error('Elige una categoría.');
    if (!Number.isFinite(p) || p <= 0) throw new Error('Ingresa un precio válido mayor a 0.');
    return { nombre: n, precio: Math.round(p * 100) / 100, categoria };
}