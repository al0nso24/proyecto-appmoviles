import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import NavBar from '../src/componentes/NavBar';
import ModalMensaje from '../src/componentes/ModalMensaje';
import { useAuth } from '../src/contexto/AuthContext';

export default function Registro({ navigation }) {
    const { registrarse } = useAuth();
    //useRef: referencias para pasar el cursor de un campo al siguiente
    const correoRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmarRef = useRef(null);
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [confirmar, setConfirmar] = useState('');
    const [verPassword, setVerPassword] = useState(false);
    const [error, setError] = useState('');
    const [cargando, setCargando] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [registrado, setRegistrado] = useState(false);

    // Limpia los campos cuando el registro fue exitoso
    useEffect(() => {
        if (submitted) {
            setNombre('');
            setCorreo('');
            setPassword('');
            setConfirmar('');
            setSubmitted(false);
        }
    }, [submitted]);

    const manejarRegistro = async () => {
        setError('');
        if (password !== confirmar) {
            setError('Las contraseñas no coinciden.');
            return;
        }
        setCargando(true);
        try {
            await registrarse({ nombre, correo, password });
            setSubmitted(true);
            setRegistrado(true);
        } catch (e) {
            setError(e.message);
        } finally {
            setCargando(false);
        }
    };

    const irALogin = () => {
        setRegistrado(false);
        navigation.navigate('Login');
    };

    return (
        <View style={styles.contenedor}>
            <ModalMensaje
                visible={registrado}
                titulo="¡Usuario registrado!"
                mensaje="Tu cuenta fue creada correctamente. Ahora inicia sesión para continuar."
                textoBoton="Iniciar Sesión"
                onCerrar={irALogin}
            />
            
            <ScrollView keyboardShouldPersistTaps="handled">
                <NavBar navigation={navigation} />

                <View style={styles.encabezadoLogin}>
                    <Image source={require('../imagenes/logo.png')} style={styles.imagenOso} />
                    <Text style={styles.tituloBienvenida}>Crea tu Cuenta</Text>
                </View>
                <Text style={styles.subtitulo}>Únete a la familia Kubi</Text>
                <Text style={styles.etiqueta}>Nombre Completo:</Text>
                <TextInput
                    style={styles.input}
                    placeholder=""
                    autoCapitalize="words"
                    value={nombre}
                    onChangeText={setNombre}
                    returnKeyType="next"
                    onSubmitEditing={() => correoRef.current && correoRef.current.focus()}
                />

                <Text style={styles.etiqueta}>Correo electrónico:</Text>
                <TextInput
                    ref={correoRef}
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
                        placeholder="Mínimo 6 caracteres"
                        secureTextEntry={!verPassword}
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={password}
                        onChangeText={setPassword}
                        returnKeyType="next"
                        onSubmitEditing={() => confirmarRef.current && confirmarRef.current.focus()}
                    />
                    <TouchableOpacity style={styles.ojo} onPress={() => setVerPassword(!verPassword)}>
                        <Ionicons name={verPassword ? 'eye-off-outline' : 'eye-outline'} size={22} color="#383896" />
                    </TouchableOpacity>
                </View>

                <Text style={styles.etiqueta}>Confirmar contraseña:</Text>
                <TextInput
                    ref={confirmarRef}
                    style={styles.input}
                    placeholder=""
                    secureTextEntry={!verPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={confirmar}
                    onChangeText={setConfirmar}
                    onSubmitEditing={manejarRegistro}
                />

                {error !== '' && <Text style={styles.textoError}>{error}</Text>}

                <TouchableOpacity
                    style={[styles.botonIniciar, cargando && styles.botonDeshabilitado]}
                    onPress={manejarRegistro}
                    disabled={cargando}
                >
                    {cargando ? <ActivityIndicator color="#fff" /> : <Text style={styles.textoBoton}>Registrar</Text>}
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