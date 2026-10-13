import React, { useCallback, useMemo, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import NavBar from './NavBar';
import ModalMensaje from './ModalMensaje';
import { useCarrito, MAX_UNIDADES } from '../contexto/CarritoContext';

export default function DetalleProducto({ navigation, producto }) {
    const { agregarAlCarrito, items } = useCarrito();
    const [cantidad, setCantidad] = useState(1);
    const [agregado, setAgregado] = useState(null);

    const productoId = producto ? producto.id : null;

    const enCarrito = useMemo(() => {
        const item = items.find((i) => i.id === productoId);
        return item ? item.cantidad : 0;
    }, [items, productoId]);

    const disminuir = useCallback(() => setCantidad((c) => Math.max(1, c - 1)), []);
    const aumentar = useCallback(() => setCantidad((c) => Math.min(MAX_UNIDADES, c + 1)), []);

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
                    <Text style={styles.textoBoton}>
                        Volver
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    const agregar = () => {
        agregarAlCarrito(producto, cantidad);
        setAgregado({ nombre: producto.nombre, cantidad });
        setCantidad(1);
    };

    const irAlCarrito = () => {
        setAgregado(null);
        navigation.navigate('Carrito');
    };

    return (
        <View style={styles.contenedor}>
            <ModalMensaje
                visible={agregado !== null}
                titulo="¡Agregado al carrito!"
                mensaje={agregado ? `${agregado.cantidad} × ${agregado.nombre}` : ''}
                textoBoton="Ir al carrito"
                onCerrar={irAlCarrito}
                textoSecundario="Seguir comprando"
                onSecundario={() => setAgregado(null)}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <NavBar navigation={navigation} />
                <TouchableOpacity
                    style={styles.botonRegresar}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={22} color="#383896" />
                    <Text style={styles.textoRegresar}>Volver</Text>
                </TouchableOpacity>
                <View style={styles.tarjetaImg}>
                    <Image
                        source={producto.imagen}
                        style={styles.imagen}
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
                    <Text style={styles.textoinfoDetalle}>• Tamaño: 20 cm</Text>
                    <Text style={styles.textoinfoDetalle}>• Material: Felpa suave</Text>
                    <Text style={styles.textoinfoDetalle}>• Peso: 160 g aprox.</Text>
                </View>
                <Text style={styles.disponibilidad}>
                    Disponibilidad: <Text style={styles.enStock}>en stock</Text>
                </Text>

                <View style={styles.filaCompra}>
                    <Text style={styles.textoPrecio}>
                        S/{(producto.precio * cantidad).toFixed(2)}
                    </Text>
                    <View style={styles.contador}>
                        <TouchableOpacity
                            style={[styles.botonCantidad, cantidad <= 1 && styles.botonDeshabilitado]}
                            onPress={disminuir}
                            disabled={cantidad <= 1}
                        >
                            <Ionicons name="remove" size={18} color="#383896" />
                        </TouchableOpacity>
                        <Text style={styles.textoCantidad}>{cantidad}</Text>
                        <TouchableOpacity
                            style={[styles.botonCantidad, cantidad >= MAX_UNIDADES && styles.botonDeshabilitado]}
                            onPress={aumentar}
                            disabled={cantidad >= MAX_UNIDADES}
                        >
                            <Ionicons name="add" size={18} color="#383896" />
                        </TouchableOpacity>
                    </View>
                </View>
                {enCarrito > 0 && (
                    <Text style={styles.avisoCarrito}>Ya tienes {enCarrito} en tu carrito</Text>
                )}

                <TouchableOpacity style={styles.botonComprar} onPress={agregar}>
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
    disponibilidad: {
        marginTop: 12,
        color: '#383896',
        fontFamily: 'MontserratAlternates_700Bold',
        fontSize: 13,
    },
    enStock: {
        color: '#2E9E4F',
    },
    filaCompra: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20,
        marginBottom: 14,
    },
    textoPrecio: {
        fontFamily: 'MontserratAlternates_700Bold',
        fontSize: 25,
        color: '#383896',
    },
    contador: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
    },
    botonCantidad: {
        backgroundColor: '#DCC2DF',
        width: 32,
        height: 32,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    botonDeshabilitado: {
        opacity: 0.4,
    },
    textoCantidad: {
        fontFamily: 'MontserratAlternates_700Bold',
        fontSize: 18,
        color: '#383896',
        minWidth: 20,
        textAlign: 'center',
    },
    avisoCarrito: {
        fontFamily: 'MontserratAlternates_400Regular',
        fontSize: 12,
        color: '#555555',
        textAlign: 'right',
        marginBottom: 10,
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