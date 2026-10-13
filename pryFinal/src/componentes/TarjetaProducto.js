import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCarrito } from '../contexto/CarritoContext';

//producto = el objeto completo
//navigation = ir a la sección de "DetalleProducto"
export default function TarjetaProducto({ producto, navigation }) {
    const { agregarAlCarrito } = useCarrito();
    const [agregado, setAgregado] = useState(false);
    const temporizador = useRef(null);

    useEffect(() => () => clearTimeout(temporizador.current), []);

    const agregar = () => {
        agregarAlCarrito(producto, 1);
        setAgregado(true);
        clearTimeout(temporizador.current);
        temporizador.current = setTimeout(() => setAgregado(false), 900);
    };

    return (
        <TouchableOpacity style={styles.tarjeta}
        onPress={() => navigation.navigate("DetalleProducto", {producto})}>
            <TouchableOpacity style={styles.botonCorazon}>
                <Ionicons name="heart-outline" size={20} color="#383896" />
            </TouchableOpacity>
            <Image source={producto.imagen} style={styles.imagen} />
            <Text style={styles.nombre}>{producto.nombre}</Text>
            <View style={styles.filaPrecio}>
                {/*Dos decimales*/}
                <Text style={styles.precio}>S/{producto.precio.toFixed(2)}</Text>
                <TouchableOpacity
                    style={[styles.botonAgregar, agregado && styles.botonAgregado]}
                    onPress={agregar}
                >
                    <Ionicons
                        name={agregado ? 'checkmark' : 'add'}
                        size={18}
                        color={agregado ? '#FFFFFF' : '#383896'}
                    />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
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

    botonAgregado: {
        backgroundColor: '#383896',
    },
});