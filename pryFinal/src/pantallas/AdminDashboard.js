import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import NavBar from '../src/componentes/NavBar';
import { useProductos } from '../src/contexto/ProductosContext';
import { leerPedidos } from '../src/servicios/pedidosService';
import { contarUsuarios } from '../src/servicios/authService';
import { CATEGORIAS } from '../src/datos/productos';

function Tarjeta({ icono, valor, etiqueta }) {
    return (
        <View style={styles.tarjeta}>
            <Ionicons name={icono} size={26} color="#383896" />
            <Text style={styles.valor}>{valor}</Text>
            <Text style={styles.etiqueta}>{etiqueta}</Text>
        </View>
    );
}

export default function AdminDashboard({ navigation }) {
    const { productos } = useProductos();
    const [pedidos, setPedidos] = useState([]);
    const [usuarios, setUsuarios] = useState(0);

    useEffect(() => {
        leerPedidos().then(setPedidos);
        contarUsuarios().then(setUsuarios);
    }, []);

    const ventas = pedidos.reduce((suma, p) => suma + p.total, 0);
    const porCategoria = CATEGORIAS.filter((c) => c !== 'Todos').map((c) => ({
        categoria: c,
        cantidad: productos.filter((p) => p.categoria === c).length,
    }));
    const maximo = Math.max(1, ...porCategoria.map((c) => c.cantidad));

    return (
        <View style={styles.contenedor}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <NavBar navigation={navigation} />
                <Text style={styles.titulo}>Panel de administrador</Text>

                <View style={styles.grilla}>
                    <Tarjeta icono="cube-outline" valor={productos.length} etiqueta="Productos" />
                    <Tarjeta icono="receipt-outline" valor={pedidos.length} etiqueta="Pedidos" />
                    <Tarjeta icono="cash-outline" valor={`S/ ${ventas.toFixed(2)}`} etiqueta="Ventas" />
                    <Tarjeta icono="people-outline" valor={usuarios} etiqueta="Clientes" />
                </View>

                <Text style={styles.seccion}>Productos por categoría</Text>
                {porCategoria.map((c) => (
                    <View key={c.categoria} style={styles.filaBarra}>
                        <Text style={styles.nombreBarra}>{c.categoria}</Text>
                        <View style={styles.pista}>
                            <View style={[styles.barra, { width: `${(c.cantidad / maximo) * 100}%` }]} />
                        </View>
                        <Text style={styles.cantidadBarra}>{c.cantidad}</Text>
                    </View>
                ))}

                <Text style={styles.seccion}>Últimos pedidos</Text>
                {pedidos.length === 0 ? (
                    <Text style={styles.vacio}>Todavía no hay pedidos.</Text>
                ) : (
                    pedidos.slice(0, 5).map((p) => (
                        <View key={p.id} style={styles.pedido}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.pedidoCliente}>{p.cliente}</Text>
                                <Text style={styles.pedidoFecha}>
                                    {new Date(p.fecha).toLocaleString('es-PE')} · {p.items.reduce((s, i) => s + i.cantidad, 0)} unid.
                                </Text>
                            </View>
                            <Text style={styles.pedidoTotal}>S/ {p.total.toFixed(2)}</Text>
                        </View>
                    ))
                )}

                <TouchableOpacity style={styles.boton} onPress={() => navigation.navigate('AdminProductos')}>
                    <Ionicons name="create-outline" size={20} color="#fff" />
                    <Text style={styles.textoBoton}>Gestionar productos</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    contenedor: { flex: 1, backgroundColor: '#FFF8F0', padding: 16, paddingTop: 60, paddingBottom: 60 },
    titulo: { fontFamily: 'DynaPuff_400Regular', fontSize: 26, color: '#383896', textAlign: 'center', marginBottom: 16 },
    grilla: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
    tarjeta: { width: '48%', backgroundColor: '#fff', borderRadius: 12, borderWidth: 1.5, borderColor: '#DCC2DF', padding: 14, alignItems: 'center', marginBottom: 12 },
    valor: { fontFamily: 'MontserratAlternates_700Bold', fontSize: 20, color: '#383896', marginTop: 6 },
    etiqueta: { fontFamily: 'MontserratAlternates_400Regular', fontSize: 13, color: '#6E6EA8' },
    seccion: { fontFamily: 'DynaPuff_400Regular', fontSize: 18, color: '#383896', marginTop: 12, marginBottom: 10 },
    filaBarra: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
    nombreBarra: { width: 80, fontFamily: 'MontserratAlternates_400Regular', fontSize: 13, color: '#383896' },
    pista: { flex: 1, height: 14, backgroundColor: '#EADCF0', borderRadius: 7, overflow: 'hidden' },
    barra: { height: 14, backgroundColor: '#383896', borderRadius: 7 },
    cantidadBarra: { width: 24, textAlign: 'right', fontFamily: 'MontserratAlternates_700Bold', color: '#383896' },
    vacio: { fontFamily: 'MontserratAlternates_400Regular', color: '#6E6EA8', textAlign: 'center', marginVertical: 8 },
    pedido: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 10, borderWidth: 1, borderColor: '#DCC2DF', padding: 12, marginBottom: 8 },
    pedidoCliente: { fontFamily: 'MontserratAlternates_700Bold', color: '#383896', fontSize: 14 },
    pedidoFecha: { fontFamily: 'MontserratAlternates_400Regular', color: '#6E6EA8', fontSize: 12 },
    pedidoTotal: { fontFamily: 'MontserratAlternates_700Bold', color: '#383896' },
    boton: { flexDirection: 'row', gap: 8, backgroundColor: '#383896', paddingVertical: 14, borderRadius: 22, alignItems: 'center', justifyContent: 'center', marginVertical: 20, marginHorizontal: 24 },
    textoBoton: { color: '#fff', fontFamily: 'MontserratAlternates_700Bold', fontSize: 15 },
});
