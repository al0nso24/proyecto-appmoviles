import AsyncStorage from '@react-native-async-storage/async-storage';

const CLAVE_PEDIDOS = 'kuby_pedidos';

export async function leerPedidos() {
    try {
        const raw = await AsyncStorage.getItem(CLAVE_PEDIDOS);
        const lista = raw ? JSON.parse(raw) : [];
        return Array.isArray(lista) ? lista : [];
    } catch {
        return [];
    }
}

export async function registrarPedido(pedido) {
    const lista = await leerPedidos();
    const nuevo = { ...pedido, id: Date.now().toString(), fecha: new Date().toISOString() };
    await AsyncStorage.setItem(CLAVE_PEDIDOS, JSON.stringify([nuevo, ...lista]));
    return nuevo;
}

// Solo los pedidos de un cliente
export async function leerPedidosDeUsuario(usuarioId) {
    const lista = await leerPedidos();
    return lista.filter((p) => p.usuarioId === usuarioId);
}