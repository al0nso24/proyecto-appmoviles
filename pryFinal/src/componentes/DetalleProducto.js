import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import NavBar from './NavBar';

export default function DetalleProducto({ navigation, producto }) {
    if (!producto) {
        return (
            <View style={styles.contenedor}>
                <Text style={styles.textoError}>
                    No se encontró el producto.
                </Text>

                <TouchableOpacity
                    style={styles.botonVolver}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.textoBoton}>Volver</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.contenedor}>
            <ScrollView>
                <NavBar navigation={navigation} />

                <TouchableOpacity
                    style={styles.botonRegresar}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons
                        name="arrow-back"
                        size={22}
                        color="#383896"
                    />
                    <Text style={styles.textoRegresar}>Volver</Text>
                </TouchableOpacity>

                <View style={styles.tarjetaDetalle}>
                    <Image
                        source={producto.imagen}
                        style={styles.imagen}
                        resizeMode="contain"
                    />

                    <Text style={styles.nombre}>
                        {producto.nombre}
                    </Text>

                    <Text style={styles.precio}>
                        S/. {producto.precio.toFixed(2)}
                    </Text>

                    {producto.categoria && (
                        <View style={styles.etiquetaCategoria}>
                            <Text style={styles.textoCategoria}>
                                {producto.categoria}
                            </Text>
                        </View>
                    )}

                    <Text style={styles.descripcionTitulo}>
                        Sobre este peluche
                    </Text>

                    <Text style={styles.descripcion}>
                        ¡Conoce a {producto.nombre}! Un peluche ideal
                        para tu colección o para regalar a alguien especial.
                        Descubre tu próximo compañero en Kubi.
                    </Text>

                    <TouchableOpacity
                        style={styles.botonComprar}
                        onPress={() => {}}
                    >
                        <Text style={styles.textoBoton}>
                            Agregar al carrito
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
        backgroundColor: '#FFF8F0',
        padding: 16,
        paddingTop: 60,
        paddingBottom: 60,
    },

    botonRegresar: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginTop: 16,
        marginBottom: 12,
    },

    textoRegresar: {
        color: '#383896',
        fontFamily: 'MontserratAlternates_700Bold',
        fontSize: 14,
    },

    tarjetaDetalle: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: '#DCC2DF',
        marginBottom: 20,
    },

    imagen: {
        width: '100%',
        height: 260,
        marginBottom: 16,
    },

    nombre: {
        fontFamily: 'DynaPuff_400Regular',
        fontSize: 25,
        color: '#383896',
        textAlign: 'center',
        marginBottom: 10,
    },

    precio: {
        fontFamily: 'MontserratAlternates_700Bold',
        fontSize: 22,
        color: '#383896',
        marginBottom: 12,
    },

    etiquetaCategoria: {
        backgroundColor: '#DCC2DF',
        paddingHorizontal: 16,
        paddingVertical: 7,
        borderRadius: 20,
        marginBottom: 20,
    },

    textoCategoria: {
        color: '#383896',
        fontFamily: 'MontserratAlternates_700Bold',
        fontSize: 13,
    },

    descripcionTitulo: {
        alignSelf: 'flex-start',
        color: '#383896',
        fontFamily: 'DynaPuff_400Regular',
        fontSize: 18,
        marginBottom: 8,
    },

    descripcion: {
        alignSelf: 'flex-start',
        color: '#555555',
        fontFamily: 'MontserratAlternates_400Regular',
        fontSize: 14,
        lineHeight: 23,
        marginBottom: 24,
    },

    botonComprar: {
        backgroundColor: '#383896',
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 22,
        width: '100%',
        alignItems: 'center',
    },

    textoBoton: {
        color: '#FFFFFF',
        fontFamily: 'MontserratAlternates_700Bold',
        fontSize: 14,
    },

    botonVolver: {
        backgroundColor: '#383896',
        padding: 12,
        borderRadius: 20,
        alignItems: 'center',
        marginTop: 16,
    },

    textoError: {
        color: '#383896',
        fontFamily: 'MontserratAlternates_700Bold',
        fontSize: 16,
    },
});