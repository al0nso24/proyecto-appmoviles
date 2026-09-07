import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import NavBar from '../src/componentes/NavBar';

export default function Registro({ navigation }) {
    return (
        <View style={styles.contenedor}>
            <ScrollView>
                <NavBar navigation={navigation} />

                <View style={styles.encabezadoLogin}>
                    <Image source={require('../imagenes/logo.png')} style={styles.imagenOso} />
                    <Text style={styles.tituloBienvenida}>Crea tu Cuenta</Text>
                </View>
                <Text style={styles.subtitulo}>Únete a la familia Kubi</Text>
                <Text style={styles.etiqueta}>Nombre Completo:</Text>
                <TextInput style={styles.input} placeholder="" keyboardType="nombre-address" />

                <Text style={styles.etiqueta}>Correo electrónico:</Text>
                <TextInput style={styles.input} placeholder="" keyboardType="email-address" />

                <Text style={styles.etiqueta}>Contraseña:</Text>
                <TextInput style={styles.input} placeholder="" secureTextEntry />

                <TouchableOpacity style={styles.botonIniciar}>
                    <Text style={styles.textoBoton}>Registrar</Text>
                </TouchableOpacity>

                <Text style={styles.textoPregunta}>Ya tienes cuenta?</Text>
                <TouchableOpacity onPress={() => navigation && navigation.navigate('Login')}>
                    <Text style={styles.enlace}>Inicia Sesión</Text>
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
        paddingTop: 60
    },
    encabezadoLogin: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        marginTop: 24,
        marginBottom: 8,
    },
    imagenOso: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
    },
    tituloBienvenida: {
        fontSize: 30 ,
        fontFamily: 'DynaPuff_400Regular',
        color: '#383896',
        textAlign: 'center',
        flexShrink: 1,
    },
    subtitulo: {
        fontFamily: 'MontserratAlternates_400Regular',
        color: '#333',
        textAlign: 'center',
        marginBottom: 24,
    },
    etiqueta: {
        fontFamily: 'MontserratAlternates_700Bold',
        color: '#383896',
        marginBottom: 6,
    },
    input: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#DCC2DF',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 10,
        marginBottom: 16,
        fontFamily: 'MontserratAlternates_400Regular',
    },
    botonIniciar: {
        backgroundColor: '#383896',
        paddingVertical: 14,
        borderRadius: 20,
        alignItems: 'center',
        marginTop: 8,
        marginBottom: 24,
    },
    textoBoton: {
        color: '#fff',
        fontFamily: 'MontserratAlternates_700Bold',
    },
    textoPregunta: {
        fontFamily: 'MontserratAlternates_400Regular',
        color: '#333',
        textAlign: 'center',
    },
    enlace: {
        fontFamily: 'MontserratAlternates_700Bold',
        color: '#383896',
        textAlign: 'center',
        marginTop: 4,
    },
});