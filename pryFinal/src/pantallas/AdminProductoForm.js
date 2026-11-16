import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import NavBar from '../componentes/NavBar';
import CamaraProducto from '../componentes/CamaraProducto';
import ModalMensaje from '../componentes/ModalMensaje';
import { useProductos } from '../contexto/ProductosContext';
import { CATEGORIAS } from '../datos/productos';
import { programarNotificacion, estadoPermisoNotificaciones } from '../servicios/notificaciones';

export default function AdminProductoForm({ navigation, producto }) {
    const { agregarProducto, editarProducto } = useProductos();
    const editando = !!producto;

    const [nombre, setNombre] = useState(producto ? producto.nombre : '');
    const [precio, setPrecio] = useState(producto ? String(producto.precio) : '');
    const [categoria, setCategoria] = useState(producto ? producto.categoria : '');
    const [fotoNueva, setFotoNueva] = useState(undefined);
    const [camara, setCamara] = useState(false);
    const [error, setError] = useState('');
    const [guardando, setGuardando] = useState(false);
    const [listo, setListo] = useState(null);

    const imagenActual =
        fotoNueva ? { uri: fotoNueva } : fotoNueva === null ? null : producto ? producto.imagen : null;

    const guardar = async () => {
        setError('');
        setGuardando(true);
        try {
            const datos = { nombre, precio, categoria };
            if (editando) {
                await editarProducto(producto.id, datos, fotoNueva);
                setListo('Producto actualizado');
            } else {
                await agregarProducto(datos, fotoNueva || null);
                setListo('Producto agregado');
                estadoPermisoNotificaciones()
                    .then((e) => e.granted && programarNotificacion('Catálogo actualizado', `Se agregó ${nombre.trim()}`, 2))
                    .catch(() => {});
            }
        } catch (e) {
            setError(e.message);
        } finally {
            setGuardando(false);
        }
    };

    return (
        <View style={styles.contenedor}>
            <CamaraProducto
                visible={camara}
                onCerrar={() => setCamara(false)}
                onFoto={(uri) => {
                    setFotoNueva(uri);
                    setCamara(false);
                }}
            />
            <ModalMensaje
                visible={listo !== null}
                titulo={listo || ''}
                mensaje={`"${nombre.trim()}" ya está en el catálogo.`}
                textoBoton="Ver productos"
                onCerrar={() => navigation.navigate('AdminProductos')}
            />
            <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
                <NavBar navigation={navigation} />
                <TouchableOpacity style={styles.volver} onPress={() => navigation.navigate('AdminProductos')}>
                    <Ionicons name="arrow-back" size={22} color="#383896" />
                    <Text style={styles.textoVolver}>Productos</Text>
                </TouchableOpacity>
                <Text style={styles.titulo}>{editando ? 'Editar producto' : 'Nuevo producto'}</Text>

                <View style={styles.cajaImagen}>
                    {imagenActual ? (
                        <Image source={imagenActual} style={styles.imagen} resizeMode="contain" />
                    ) : (
                        <Ionicons name="image-outline" size={56} color="#BDA6CE" />
                    )}
                </View>
                <View style={styles.filaFoto}>
                    <TouchableOpacity style={styles.botonFoto} onPress={() => setCamara(true)}>
                        <Ionicons name="camera-outline" size={18} color="#383896" />
                        <Text style={styles.textoFoto}>{imagenActual ? 'Cambiar foto' : 'Tomar foto'}</Text>
                    </TouchableOpacity>
                    {imagenActual && (
                        <TouchableOpacity style={styles.botonFoto} onPress={() => setFotoNueva(null)}>
                            <Ionicons name="close-circle-outline" size={18} color="#D62B2B" />
                            <Text style={[styles.textoFoto, { color: '#D62B2B' }]}>Quitar</Text>
                        </TouchableOpacity>
                    )}
                </View>

                <Text style={styles.etiqueta}>Nombre</Text>
                <TextInput style={styles.input} value={nombre} onChangeText={setNombre} placeholder="Ej: Chiikawa" />

                <Text style={styles.etiqueta}>Precio (S/)</Text>
                <TextInput style={styles.input} value={precio} onChangeText={setPrecio} placeholder="Ej: 59.90" keyboardType="decimal-pad" />

                <Text style={styles.etiqueta}>Categoría</Text>
                <View style={styles.categorias}>
                    {CATEGORIAS.filter((c) => c !== 'Todos').map((c) => (
                        <TouchableOpacity
                            key={c}
                            style={[styles.chip, categoria === c && styles.chipActivo]}
                            onPress={() => setCategoria(c)}
                        >
                            <Text style={[styles.textoChip, categoria === c && styles.textoChipActivo]}>{c}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {error !== '' && <Text style={styles.error}>{error}</Text>}

                <TouchableOpacity style={[styles.boton, guardando && { opacity: 0.6 }]} onPress={guardar} disabled={guardando}>
                    {guardando ? <ActivityIndicator color="#fff" /> : <Text style={styles.textoBoton}>{editando ? 'Guardar cambios' : 'Agregar producto'}</Text>}
                </TouchableOpacity>
                <TouchableOpacity style={styles.botonCancelar} onPress={() => navigation.navigate('AdminProductos')}>
                    <Text style={styles.textoCancelar}>Cancelar</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    contenedor: { flex: 1, backgroundColor: '#FFF8F0', padding: 16, paddingTop: 60, paddingBottom: 60 },
    volver: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 },
    textoVolver: { fontFamily: 'MontserratAlternates_400Regular', color: '#383896', fontSize: 15 },
    titulo: { fontFamily: 'DynaPuff_400Regular', fontSize: 26, color: '#383896', textAlign: 'center', marginBottom: 12 },
    cajaImagen: { alignSelf: 'center', width: 170, height: 170, backgroundColor: '#fff', borderRadius: 14, borderWidth: 1.5, borderColor: '#DCC2DF', alignItems: 'center', justifyContent: 'center' },
    imagen: { width: 150, height: 150 },
    filaFoto: { flexDirection: 'row', justifyContent: 'center', gap: 10, marginTop: 10, marginBottom: 8 },
    botonFoto: { flexDirection: 'row', alignItems: 'center', gap: 6, borderWidth: 1, borderColor: '#DCC2DF', backgroundColor: '#fff', paddingVertical: 8, paddingHorizontal: 14, borderRadius: 16 },
    textoFoto: { fontFamily: 'MontserratAlternates_400Regular', color: '#383896', fontSize: 14 },
    etiqueta: { fontFamily: 'MontserratAlternates_700Bold', color: '#2B2B7A', marginTop: 10, marginHorizontal: 4 },
    input: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#DCC2DF', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10, marginTop: 4, fontFamily: 'MontserratAlternates_400Regular' },
    categorias: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 6 },
    chip: { borderWidth: 1, borderColor: '#383896', borderRadius: 16, paddingVertical: 6, paddingHorizontal: 14, backgroundColor: '#fff' },
    chipActivo: { backgroundColor: '#383896' },
    textoChip: { fontFamily: 'MontserratAlternates_400Regular', color: '#383896' },
    textoChipActivo: { color: '#fff' },
    error: { fontFamily: 'MontserratAlternates_400Regular', color: '#C0392B', textAlign: 'center', marginTop: 12 },
    boton: { backgroundColor: '#383896', paddingVertical: 14, borderRadius: 12, alignItems: 'center', marginTop: 20, marginHorizontal: 24 },
    textoBoton: { color: '#fff', fontFamily: 'MontserratAlternates_700Bold', fontSize: 16 },
    botonCancelar: { borderWidth: 1, borderColor: '#383896', paddingVertical: 12, borderRadius: 12, alignItems: 'center', marginTop: 12, marginHorizontal: 24, marginBottom: 30 },
    textoCancelar: { color: '#383896', fontFamily: 'MontserratAlternates_400Regular', fontSize: 16 },
});
