import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ModalMensaje({
    visible,
    titulo,
    mensaje,
    textoBoton = 'Aceptar',
    onCerrar,
    icono = 'checkmark-circle',
    textoSecundario,
    onSecundario,
}) {
    return (
        <Modal visible={visible} transparent animationType="fade" onRequestClose={onSecundario || onCerrar}>
            <View style={styles.fondo}>
                <View style={styles.tarjeta}>
                    <Ionicons name={icono} size={56} color="#383896" />
                    <Text style={styles.titulo}>{titulo}</Text>
                    <Text style={styles.mensaje}>{mensaje}</Text>
                    <TouchableOpacity style={styles.boton} onPress={onCerrar}>
                        <Text style={styles.textoBoton}>{textoBoton}</Text>
                    </TouchableOpacity>
                    {textoSecundario ? (
                        <TouchableOpacity style={styles.botonSecundario} onPress={onSecundario || onCerrar}>
                            <Text style={styles.textoSecundario}>{textoSecundario}</Text>
                        </TouchableOpacity>
                    ) : null}
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    fondo: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    tarjeta: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: '#FFF8F0',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#DCC2DF',
        padding: 24,
        alignItems: 'center',
    },
    titulo: {
        fontFamily: 'DynaPuff_400Regular',
        fontSize: 24,
        color: '#383896',
        textAlign: 'center',
        marginTop: 8,
    },
    mensaje: {
        fontFamily: 'MontserratAlternates_400Regular',
        color: '#333',
        textAlign: 'center',
        marginTop: 8,
        marginBottom: 20,
    },
    boton: {
        backgroundColor: '#383896',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 20,
    },
    textoBoton: {
        color: '#fff',
        fontFamily: 'MontserratAlternates_700Bold',
    },
    botonSecundario: {
        marginTop: 12,
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    textoSecundario: {
        color: '#383896',
        fontFamily: 'MontserratAlternates_700Bold',
        fontSize: 13,
    },
});
