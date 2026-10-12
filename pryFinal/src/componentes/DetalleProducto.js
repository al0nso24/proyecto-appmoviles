import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import NavBar from './NavBar';

//producto = el objeto del producto que se seleccinó
export default function DetalleProducto({ navigation, producto }) {
    //Si producto es null, la pantalla no muestra nada, solo el texto de error
    if (!producto) {
        return (
            <View style={styles.contenedor}>
                <Text style={styles.textoError}>
                    No se encontró el producto.
                </Text>

                {/*Botón para regresar*/}
                <TouchableOpacity
                    style={styles.botonVolver}
                    //navigation.goBack() = vuelve a la pantalla anterior
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.textoBoton}>
                        Volver
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.contenedor}>
            {/*Usé ScrollView porque en este caso solo es una tarjeta, no una lista*/}
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

                <View style={styles.tarjetaImg}>
                    <Image
                        source={producto.imagen}
                        style={styles.imagen}
                        //Hace que la imagen se vea completa y bien encajada
                        resizeMode="contain"
                    />
                </View>

                <Text style={styles.textoNombrePeluche}>
                    {producto.nombre}
                </Text>

                <Text style={styles.descripcion}>
                    Peluche de {producto.nombre} suave y adorable,
                    perfecto para coleccionar, decorar tu habitación o
                    regalar a alguien especial.
                </Text>

                <Text style={styles.textoDetalle}>Detalles</Text>
                <View style={{ paddingLeft: 12 }}>
                    <Text style={styles.textoinfoDetalle}>
                        • Tamaño: 20cm
                    </Text>
                    <Text style={styles.textoinfoDetalle}>
                        • Material: Felpa suave
                    </Text>
                    <Text style={styles.textoinfoDetalle}>
                        • Peso: 180 g aprox.
                    </Text>
                </View>

                <Text style={styles.textoPrecio}>
                    {/*Precio con 2 decimales*/}
                    S/. {producto.precio.toFixed(2)}
                </Text>

                {/*Aún no funciona ._.*/}
                <TouchableOpacity
                    style={styles.botonComprar}
                    onPress={() => { }}
                >
                    <Text style={styles.textoBoton}>
                        Agregar al carrito
                    </Text>
                </TouchableOpacity>
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

    tarjetaImg: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        alignItems: 'center',
        marginBottom: 20,
        borderWidth: 2.1,
        borderColor: '#DCC2DF',
        boxShadow: '0px 4px 4px #DCC2DF',
    },

    imagen: {
        width: '100%',
        height: 260,
        marginBottom: 16,
    },

    textoNombrePeluche: {
        fontFamily: 'MontserratAlternates_700Bold',
        fontSize: 35,
        color: '#383896',
        marginBottom: 12,
    },

    descripcion: {
        textAlign: "center",
        color: '#555555',
        fontFamily: 'MontserratAlternates_400Regular',
        fontSize: 14,
        lineHeight: 23,
        marginBottom: 22,
    },

    textoDetalle: {
        fontFamily: 'MontserratAlternates_700Bold',
        fontSize: 14,
        color: '#383896',
        marginBottom: 12,
    },

    textoinfoDetalle: {
        color: '#555555',
        fontFamily: 'MontserratAlternates_400Regular',
        fontSize: 14,
    },

    textoPrecio: {
        fontFamily: 'MontserratAlternates_700Bold',
        fontSize: 25,
        color: '#383896',
        marginTop: 22,
        marginBottom: 22,
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

//Psdt: Creo que esto debía estar dentro de la carpeta de pantallas :v