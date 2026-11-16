import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import NavBar from '../src/componentes/NavBar';
import { useAuth } from '../src/contexto/AuthContext';

export default function Perfil({ navigation }) {
    const { usuario, actualizarPerfil, cerrarSesion } = useAuth();
    const [editando, setEditando] = useState(false);
    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState('');
    const [error, setError] = useState('');
    const [guardando, setGuardando] = useState(false);

    if (!usuario) {
        return (
            <View style={styles.contenedor}>
                <ScrollView>
                    <NavBar navigation={navigation} />
                    <Text style={styles.titulo}>Perfil</Text>
                    <Text style={styles.subtitulo}>Inicia sesión para ver tu perfil</Text>
                    <TouchableOpacity style={styles.botonPrincipal} onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.textoBotonPrincipal}>Iniciar Sesión</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }

    const empezarEdicion = () => {
        setNombre(usuario.nombre);
        setTelefono(usuario.telefono || '');
        setDireccion(usuario.direccion || '');
        setError('');
        setEditando(true);
    };

    const guardar = async () => {
        setError('');
        setGuardando(true);
        try {
            await actualizarPerfil({ nombre, telefono, direccion });
            setEditando(false);
        } catch (e) {
            setError(e.message);
        } finally {
            setGuardando(false);
        }
    };

    const salir = async () => {
        await cerrarSesion();
        navigation.navigate('Inicio');
    };

    return (
        <View style={styles.contenedor}>
            <ScrollView keyboardShouldPersistTaps="handled">
                <NavBar navigation={navigation} />

                <Text style={styles.titulo}>Perfil</Text>
                <Text style={styles.saludo}>¡Hola {usuario.nombre.split(' ')[0]}!</Text>

                <View style={styles.linea} />
                <Text style={styles.seccion}>Información personal</Text>

                <Text style={styles.etiqueta}>Nombre completo:</Text>
                {editando ? (
                    <TextInput style={styles.input} value={nombre} onChangeText={setNombre} autoCapitalize="words" />
                ) : (
                    <Text style={styles.valor}>{usuario.nombre}</Text>
                )}

                <Text style={styles.etiqueta}>Correo electrónico:</Text>
                <Text style={styles.valor}>{usuario.correo}</Text>

                <Text style={styles.etiqueta}>Teléfono:</Text>
                {editando ? (
                    <TextInput style={styles.input} value={telefono} onChangeText={setTelefono} keyboardType="phone-pad" />
                ) : (
                    <Text style={styles.valor}>{usuario.telefono || 'Sin registrar'}</Text>
                )}

                <Text style={styles.etiqueta}>Dirección:</Text>
                {editando ? (
                    <TextInput style={styles.input} value={direccion} onChangeText={setDireccion} />
                ) : (
                    <Text style={styles.valor}>{usuario.direccion || 'Sin registrar'}</Text>
                )}

                {error !== '' && <Text style={styles.textoError}>{error}</Text>}

                {editando ? (
                    <>
                        <TouchableOpacity
                            style={[styles.botonPrincipal, guardando && styles.deshabilitado]}
                            onPress={guardar}
                            disabled={guardando}
                        >
                            {guardando ? <ActivityIndicator color="#fff" /> : <Text style={styles.textoBotonPrincipal}>Guardar cambios</Text>}
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.botonSecundario} onPress={() => setEditando(false)}>
                            <Text style={styles.textoBotonSecundario}>Cancelar</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <>
                        <TouchableOpacity style={styles.botonPrincipal} onPress={empezarEdicion}>
                            <Text style={styles.textoBotonPrincipal}>Editar datos</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.botonCerrar} onPress={salir}>
                            <Text style={styles.textoBotonCerrar}>Cerrar Sesión</Text>
                        </TouchableOpacity>
                    </>
                )}
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
        paddingBottom: 60
    },

    titulo: {
        fontFamily: 'DynaPuff_400Regular',
        fontSize: 28,
        color: '#383896',
        textAlign: 'center',
        marginTop: 16,
    },

    saludo: {
        fontFamily: 'DynaPuff_400Regular',
        fontSize: 28,
        color: '#383896',
        textAlign: 'center',
        marginTop: 16,
        marginBottom: 16,
    },

    subtitulo: {
        fontFamily: 'MontserratAlternates_400Regular',
        color: '#333',
        textAlign: 'center',
        marginVertical: 24,
    },

    linea: {
        height: 1,
        backgroundColor: '#383896',
        marginHorizontal: 16,
    },

    seccion: {
        fontFamily: 'MontserratAlternates_400Regular',
        fontSize: 16,
        color: '#383896',
        textAlign: 'center',
        marginVertical: 16,
    },

    etiqueta: {
        fontFamily: 'MontserratAlternates_400Regular',
        fontSize: 15,
        color: '#2B2B7A',
        marginTop: 8,
        marginHorizontal: 16,
    },

    valor: {
        fontFamily: 'MontserratAlternates_400Regular',
        fontSize: 15,
        color: '#6E6EA8',
        marginTop: 2,
        marginBottom: 8,
        marginHorizontal: 16,
    },

    input: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#DCC2DF',
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginTop: 4,
        marginBottom: 8,
        marginHorizontal: 16,
        fontFamily: 'MontserratAlternates_400Regular',
    },

    textoError: {
        fontFamily: 'MontserratAlternates_400Regular',
        color: '#C0392B',
        textAlign: 'center',
        marginTop: 8,
    },

    botonPrincipal: {
        backgroundColor: '#383896',
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 24,
        marginHorizontal: 32,
    },

    textoBotonPrincipal: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'MontserratAlternates_700Bold',
    },

    botonSecundario: {
        borderWidth: 1,
        borderColor: '#383896',
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 12,
        marginHorizontal: 32,
        marginBottom: 24,
    },

    textoBotonSecundario: {
        color: '#383896',
        fontSize: 16,
        fontFamily: 'MontserratAlternates_400Regular',
    },

    botonCerrar: {
        borderWidth: 1,
        borderColor: '#D62B2B',
        backgroundColor: '#fff',
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 12,
        marginHorizontal: 32,
        marginBottom: 24,
    },

    textoBotonCerrar: {
        color: '#D62B2B',
        fontSize: 16,
        fontFamily: 'MontserratAlternates_400Regular',
    },

    deshabilitado: {
        opacity: 0.6,
    },
});