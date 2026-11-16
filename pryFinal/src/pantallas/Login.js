import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import NavBar from '../src/componentes/NavBar';
import ModalMensaje from '../src/componentes/ModalMensaje';
import { useAuth } from '../src/contexto/AuthContext';

export default function Login({ navigation }) {
    const { iniciarSesion } = useAuth();
    //useRef: referencia al campo de contraseña para pasar el cursor desde el correo
    const passwordRef = useRef(null);
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [verPassword, setVerPassword] = useState(false);
    const [error, setError] = useState('');
    const [cargando, setCargando] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [bienvenida, setBienvenida] = useState('');

    useEffect(() => {
        if (submitted) {
            setCorreo('');
            setPassword('');
            setSubmitted(false);
        }
    }, [submitted]);

    const manejarLogin = async () => {
        setError('');
        setCargando(true);
        try {
            const usuario = await iniciarSesion({ correo, password });
            setSubmitted(true);
            setBienvenida(usuario.nombre.split(' ')[0]);
        } catch (e) {
            setError(e.message);
        } finally {
            setCargando(false);
        }
    };

    const continuar = () => {
        setBienvenida('');
        navigation.navigate('Inicio');
    };

    return (
        <View style={styles.contenedor}>
            <ModalMensaje
                visible={bienvenida !== ''}
                titulo={`¡Bienvenido, ${bienvenida}!`}
                mensaje="Tus datos fueron validados correctamente."
                textoBoton="Continuar"
                onCerrar={continuar}
            />
            <ScrollView keyboardShouldPersistTaps="handled">
                <NavBar navigation={navigation} />

                <View style={styles.encabezadoLogin}>
                    <Image source={require('../imagenes/logo.png')} style={styles.imagenOso} />
                    <Text style={styles.tituloBienvenida}>Bienvenidos a Kuby</Text>
                </View>
                <Text style={styles.subtitulo}>Iniciar Sesión para continuar</Text>

                <Text style={styles.etiqueta}>Correo electrónico:</Text>
                <TextInput
                    style={styles.input}
                    placeholder=""
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={correo}
                    onChangeText={setCorreo}
                    returnKeyType="next"
                    onSubmitEditing={() => passwordRef.current && passwordRef.current.focus()}
                />

                <Text style={styles.etiqueta}>Contraseña:</Text>
                <View style={styles.campoPassword}>
                    <TextInput
                        ref={passwordRef}
                        style={styles.input}
                        placeholder=""
                        secureTextEntry={!verPassword}
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={password}
                        onChangeText={setPassword}
                        onSubmitEditing={manejarLogin}
                    />
                    <TouchableOpacity style={styles.ojo} onPress={() => setVerPassword(!verPassword)}>
                        <Ionicons name={verPassword ? 'eye-off-outline' : 'eye-outline'} size={22} color="#383896" />
                    </TouchableOpacity>
                </View>

                {error !== '' && <Text style={styles.textoError}>{error}</Text>}

                <TouchableOpacity
                    style={[styles.botonIniciar, cargando && styles.botonDeshabilitado]}
                    onPress={manejarLogin}
                    disabled={cargando}
                >
                    {cargando ? <ActivityIndicator color="#fff" /> : <Text style={styles.textoBoton}>Iniciar Sesión</Text>}
                </TouchableOpacity>

                <Text style={styles.textoPregunta}>¿No tienes cuenta?</Text>
                <TouchableOpacity onPress={() => navigation && navigation.navigate('Registro')}>
                    <Text style={styles.enlace}>Regístrate</Text>
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

    campoPassword: {
        position: 'relative',
        justifyContent: 'center',
    },

    ojo: {
        position: 'absolute',
        right: 14,
        top: 10,
    },

    textoError: {
        fontFamily: 'MontserratAlternates_400Regular',
        color: '#C0392B',
        textAlign: 'center',
        marginBottom: 8,
    },

    botonDeshabilitado: {
        opacity: 0.6,
    },
});