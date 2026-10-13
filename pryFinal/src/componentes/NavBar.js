import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexto/AuthContext';
import { useCarrito } from '../contexto/CarritoContext';

const OPCIONES = [
    { nombre: 'Inicio', pantalla: 'Inicio', icono: 'home-outline' },
    { nombre: 'Catálogo', pantalla: 'Catalogo', icono: 'book-outline' },
    { nombre: 'Categoría', pantalla: 'Categoria', icono: 'grid-outline' },
    { nombre: 'Favoritos', pantalla: 'Favoritos', icono: 'heart-outline' },
    { nombre: 'Carrito', pantalla: 'Carrito', icono: 'cart-outline' },
    { nombre: 'Pedidos', pantalla: 'Pedidos', icono: 'reader-outline' },
    { nombre: 'Perfil', pantalla: 'Perfil', icono: 'person-circle-outline' },
];

const DISPONIBLES = ['Inicio', 'Catalogo', 'Carrito', 'Perfil', 'Login', 'Registro'];

function Cabecera({ icono, onLogo, onMenu, insignia = 0 }) {
    return (
        <View style={styles.encabezado}>
            <TouchableOpacity style={styles.filaLogo} onPress={onLogo}>
                <Image source={require('../../imagenes/logo.png')} style={styles.imagenLogo} />
                <Image source={require('../../imagenes/titulo.png')} style={styles.imagenTitulo} />
            </TouchableOpacity>

            <TouchableOpacity onPress={onMenu}>
                <Ionicons name={icono} size={28} color="#383896" />
                {insignia > 0 && (
                    <View style={styles.insignia}>
                        <Text style={styles.textoInsignia}>{insignia > 9 ? '9+' : insignia}</Text>
                    </View>
                )}
            </TouchableOpacity>
        </View>
    );
}

export default function NavBar({ navigation }) {
    const { usuario } = useAuth();
    const { cantidadTotal } = useCarrito();
    const [abierto, setAbierto] = useState(false);
    const [aviso, setAviso] = useState('');

    const cerrarMenu = () => {
        setAbierto(false);
        setAviso('');
    };

    const ir = (opcion) => {
        if (!DISPONIBLES.includes(opcion.pantalla)) {
            setAviso(`${opcion.nombre} estará disponible pronto.`);
            return;
        }
        cerrarMenu();
        navigation && navigation.navigate(opcion.pantalla);
    };

    return (
        <>
            <Cabecera
                icono="menu"
                insignia={cantidadTotal}
                onLogo={() => navigation && navigation.navigate('Inicio')}
                onMenu={() => setAbierto(true)}
            />

            <Modal visible={abierto} animationType="fade" onRequestClose={cerrarMenu}>
                <View style={styles.menu}>
                    <Cabecera
                        icono="close"
                        onLogo={() => ir(OPCIONES[0])}
                        onMenu={cerrarMenu}
                    />

                    <View style={styles.lista}>
                        {OPCIONES.map((opcion, i) => (
                            <TouchableOpacity
                                key={opcion.pantalla}
                                style={[styles.opcion, i === OPCIONES.length - 1 && styles.opcionUltima]}
                                onPress={() => ir(opcion)}
                            >
                                <View style={styles.columnaIcono}>
                                    <Ionicons name={opcion.icono} size={28} color="#383896" />
                                </View>
                                <Text style={styles.textoOpcion}>{opcion.nombre}</Text>
                                {opcion.pantalla === 'Carrito' && cantidadTotal > 0 && (
                                    <View style={styles.insigniaOpcion}>
                                        <Text style={styles.textoInsignia}>{cantidadTotal}</Text>
                                    </View>
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>

                    {aviso !== '' && <Text style={styles.aviso}>{aviso}</Text>}

                    {!usuario && (
                        <View style={styles.botones}>
                            <TouchableOpacity style={styles.boton} onPress={() => ir({ nombre: 'Login', pantalla: 'Login' })}>
                                <Text style={styles.textoBoton}>Iniciar Sesión</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.boton} onPress={() => ir({ nombre: 'Registro', pantalla: 'Registro' })}>
                                <Text style={styles.textoBoton}>Regístrate</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    encabezado: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#BDA6CE',
        padding: 10,
        borderRadius: 10,
        marginBottom: 16
    },

    filaLogo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },

    imagenLogo: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
    },

    imagenTitulo: {
        width: 70,
        height: 24,
        resizeMode: 'contain',
    },

    menu: {
        flex: 1,
        backgroundColor: '#FFF8F0',
        padding: 16,
        paddingTop: 60,
    },

    lista: {
        marginTop: 8,
        marginHorizontal: 16,
    },

    opcion: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        borderTopWidth: 1,
        borderColor: '#383896',
    },

    opcionUltima: {
        borderBottomWidth: 1,
    },

    columnaIcono: {
        width: 56,
        alignItems: 'center',
    },

    textoOpcion: {
        marginLeft: 20,
        fontSize: 16,
        fontFamily: 'MontserratAlternates_700Bold',
        color: '#383896',
    },

    aviso: {
        marginTop: 16,
        textAlign: 'center',
        fontFamily: 'MontserratAlternates_400Regular',
        color: '#383896',
    },

    botones: {
        alignItems: 'center',
        gap: 14,
        marginTop: 32
    },

    boton: {
        width: 200,
        backgroundColor: '#383896',
        paddingVertical: 12,
        borderRadius: 20,
        alignItems: 'center',
    },

    textoBoton: {
        color: '#fff',
        fontFamily: 'MontserratAlternates_700Bold',
    },
    insignia: {
        position: 'absolute',
        top: -6,
        right: -8,
        minWidth: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: '#383896',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 4,
    },
    insigniaOpcion: {
        marginLeft: 10,
        minWidth: 22,
        height: 22,
        borderRadius: 11,
        backgroundColor: '#383896',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 5,
    },
    textoInsignia: {
        color: '#fff',
        fontSize: 11,
        fontFamily: 'MontserratAlternates_700Bold',
    },
});