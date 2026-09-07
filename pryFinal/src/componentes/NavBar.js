import React from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function NavBar({ navigation }) {
    return (
        <View style={styles.encabezado}>
        <TouchableOpacity
            style={styles.filaLogo}
            onPress={() => navigation && navigation.navigate('Inicio')}
        >
            <Image source={require('../../imagenes/logo.png')} style={styles.imagenLogo} />
            <Image source={require('../../imagenes/titulo.png')} style={styles.imagenTitulo} />
        </TouchableOpacity>

        <TouchableOpacity>
            <Ionicons name="menu" size={28} color="#383896" />
        </TouchableOpacity>
        </View>
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
        marginBottom: 16,
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
});