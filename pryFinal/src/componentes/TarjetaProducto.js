import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TarjetaProducto({ nombre, precio, imagen }) {
    return (
        <View style={styles.tarjeta}>
            <TouchableOpacity style={styles.botonCorazon}>
                <Ionicons name="heart-outline" size={20} color="#383896" />
            </TouchableOpacity>
            <Image source={imagen} style={styles.imagen} />
            <Text style={styles.nombre}>{nombre}</Text>
            <View style={styles.filaPrecio}>
                <Text style={styles.precio}>{precio}</Text>
                <TouchableOpacity style={styles.botonAgregar}>
                    <Text style={styles.textoAgregar}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    tarjeta: {
        width: '48%',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 10,
        marginBottom: 12,
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: '#DCC2DF',
        boxShadow: '0px 4px 4px #DCC2DF',
    },

    botonCorazon: {
        alignSelf: 'flex-end', 
    },

    imagen: {
        width: 90,
        height: 90,
        marginBottom: 8,
        marginTop: 8,
        resizeMode: 'contain',
    },

    nombre: {
        fontFamily: 'MontserratAlternates_700Bold',
        color: '#383896',
        fontSize: 14,
        textAlign: 'center',
        marginTop: 4,
    },

    filaPrecio: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 32,
        marginTop: 14,
    },

    precio: {
        fontFamily: 'MontserratAlternates_400Regular',
        color: '#383896',
        fontSize: 14,
        fontWeight: 'bold',
    },

    botonAgregar: {
        backgroundColor: '#DCC2DF',
        width: 28,
        height: 28,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    
    textoAgregar: {
        color: '#383896',
        fontSize: 16,
        fontWeight: 'bold',
    },
});