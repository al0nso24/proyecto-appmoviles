import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import NavBar from '../src/componentes/NavBar';
import ModalMensaje from '../src/componentes/ModalMensaje';
import { useProductos } from '../src/contexto/ProductosContext';

export default function AdminProductos({ navigation }) {
    const { productos, eliminarProducto } = useProductos();
    const [busqueda, setBusqueda] = useState('');
    const [porEliminar, setPorEliminar] = useState(null);

    const filtrados = useMemo(
        () => productos.filter((p) => p.nombre.toLowerCase().includes(busqueda.toLowerCase())),
        [productos, busqueda]
    );

    const confirmarEliminar = async () => {
        const id = porEliminar.id;
        setPorEliminar(null);
        await eliminarProducto(id);
    };

    const encabezado = (
        <View>
            <NavBar navigation={navigation} />
            <TouchableOpacity style={styles.volver} onPress={() => navigation.navigate('AdminDashboard')}>
                <Ionicons name="arrow-back" size={22} color="#383896" />
                <Text style={styles.textoVolver}>Panel</Text>
            </TouchableOpacity>
            <Text style={styles.titulo}>Productos</Text>
            <TouchableOpacity style={styles.botonNuevo} onPress={() => navigation.navigate('AdminProductoForm', { producto: null })}>
                <Ionicons name="add-circle-outline" size={20} color="#fff" />
                <Text style={styles.textoNuevo}>Nuevo producto</Text>
            </TouchableOpacity>
            <TextInput style={styles.buscador} placeholder="Buscar..." value={busqueda} onChangeText={setBusqueda} />
            <Text style={styles.contador}>{filtrados.length} productos</Text>
        </View>
    );

    return (
        <View style={styles.contenedor}>
            <ModalMensaje
                visible={porEliminar !== null}
                icono="trash-outline"
                titulo="¿Eliminar producto?"
                mensaje={porEliminar ? `Se eliminará "${porEliminar.nombre}" del catálogo.` : ''}
                textoBoton="Eliminar"
                onCerrar={confirmarEliminar}
                textoSecundario="Cancelar"
                onSecundario={() => setPorEliminar(null)}
            />
            <FlatList
                data={filtrados}
                keyExtractor={(item) => item.id.toString()}
                ListHeaderComponent={encabezado}
                ListEmptyComponent={<Text style={styles.vacio}>No hay productos.</Text>}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={styles.fila}>
                        <Image source={item.imagen} style={styles.imagen} />
                        <View style={{ flex: 1 }}>
                            <Text style={styles.nombre} numberOfLines={1}>{item.nombre}</Text>
                            <Text style={styles.detalle}>{item.categoria} · S/ {item.precio.toFixed(2)}</Text>
                        </View>
                        <TouchableOpacity style={styles.icono} onPress={() => navigation.navigate('AdminProductoForm', { producto: item })}>
                            <Ionicons name="create-outline" size={22} color="#383896" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.icono} onPress={() => setPorEliminar(item)}>
                            <Ionicons name="trash-outline" size={22} color="#D62B2B" />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    contenedor: { flex: 1, backgroundColor: '#FFF8F0', padding: 16, paddingTop: 60, paddingBottom: 60 },
    volver: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 },
    textoVolver: { fontFamily: 'MontserratAlternates_400Regular', color: '#383896', fontSize: 15 },
    titulo: { fontFamily: 'DynaPuff_400Regular', fontSize: 26, color: '#383896', textAlign: 'center', marginBottom: 12 },
    botonNuevo: { flexDirection: 'row', gap: 8, backgroundColor: '#383896', paddingVertical: 12, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
    textoNuevo: { color: '#fff', fontFamily: 'MontserratAlternates_700Bold' },
    buscador: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#DCC2DF', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 10, fontFamily: 'MontserratAlternates_400Regular', marginBottom: 8 },
    contador: { fontFamily: 'MontserratAlternates_400Regular', color: '#6E6EA8', fontSize: 13, marginBottom: 8 },
    vacio: { textAlign: 'center', fontFamily: 'MontserratAlternates_400Regular', color: '#6E6EA8', marginTop: 16 },
    fila: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: '#fff', borderRadius: 12, borderWidth: 1, borderColor: '#DCC2DF', padding: 10, marginBottom: 10 },
    imagen: { width: 52, height: 52, borderRadius: 8, resizeMode: 'contain', backgroundColor: '#FFF8F0' },
    nombre: { fontFamily: 'MontserratAlternates_700Bold', color: '#383896', fontSize: 14 },
    detalle: { fontFamily: 'MontserratAlternates_400Regular', color: '#6E6EA8', fontSize: 12 },
    icono: { padding: 6 },
});
