import React, { useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import NavBar from '../src/componentes/NavBar';
import ModalMensaje from '../src/componentes/ModalMensaje';
import { useAuth } from '../src/contexto/AuthContext';
import { useCarrito, MAX_UNIDADES } from '../src/contexto/CarritoContext';

export default function Carrito({ navigation }) {
    const { usuario } = useAuth();
    const { items, total, cambiarCantidad, quitarDelCarrito, vaciarCarrito } = useCarrito();
    const [pedido, setPedido] = useState(null);
    const [pedirLogin, setPedirLogin] = useState(false);

    const pagar = () => {
        if (!usuario) {
            setPedirLogin(true);
            return;
        }
        setPedido({ nombre: usuario.nombre.split(' ')[0], total });
        vaciarCarrito();
    };

    const renderItem = ({ item }) => (
        <View style={styles.fila}>
            <View style={styles.cajaImagen}>
                <Image source={item.imagen} style={styles.imagen} />
            </View>
            <View style={styles.info}>
                <View style={styles.filaNombre}>
                    <Text style={styles.nombre} numberOfLines={1}>{item.nombre}</Text>
                    <Text style={styles.precio}>S/{item.subtotal.toFixed(2)}</Text>
                </View>
                <View style={styles.filaControles}>
                    <View style={styles.contador}>
                        <TouchableOpacity
                            style={[styles.botonCantidad, item.cantidad <= 1 && styles.botonDeshabilitado]}
                            onPress={() => cambiarCantidad(item.id, item.cantidad - 1)}
                            disabled={item.cantidad <= 1}
                        >
                            <Ionicons name="remove" size={16} color="#383896" />
                        </TouchableOpacity>
                        <Text style={styles.cantidad}>{item.cantidad}</Text>
                        <TouchableOpacity
                            style={[styles.botonCantidad, item.cantidad >= MAX_UNIDADES && styles.botonDeshabilitado]}
                            onPress={() => cambiarCantidad(item.id, item.cantidad + 1)}
                            disabled={item.cantidad >= MAX_UNIDADES}
                        >
                            <Ionicons name="add" size={16} color="#383896" />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => quitarDelCarrito(item.id)}>
                        <Ionicons name="trash-outline" size={22} color="#383896" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    const encabezado = (
        <View>
            <NavBar navigation={navigation} />
            <Text style={styles.titulo}>Tu carrito</Text>
            {items.length > 0 && (
                <View style={styles.filaEncabezado}>
                    <Text style={styles.textoEncabezado}>Productos</Text>
                    <Text style={styles.textoEncabezado}>Total</Text>
                </View>
            )}
        </View>
    );

    const pie = items.length > 0 ? (
        <View>
            <View style={styles.linea} />
            <View style={styles.filaTotal}>
                <Text style={styles.textoTotal}>Total Estimado</Text>
                <Text style={styles.montoTotal}>S/ {total.toFixed(2)}</Text>
            </View>
            <TouchableOpacity style={styles.botonPagar} onPress={pagar}>
                <Text style={styles.textoBotonPagar}>Pagar pedido</Text>
            </TouchableOpacity>
        </View>
    ) : null;

    const vacio = (
        <View style={styles.vacio}>
            <Ionicons name="cart-outline" size={56} color="#BDA6CE" />
            <Text style={styles.textoVacio}>Tu carrito está vacío</Text>
            <TouchableOpacity style={styles.botonPagar} onPress={() => navigation.navigate('Catalogo')}>
                <Text style={styles.textoBotonPagar}>Ver catálogo</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.contenedor}>
            <ModalMensaje
                visible={pedido !== null}
                titulo="¡Pedido realizado!"
                mensaje={pedido ? `Gracias por tu compra, ${pedido.nombre}. Total: S/ ${pedido.total.toFixed(2)}` : ''}
                textoBoton="Volver al inicio"
                onCerrar={() => {
                    setPedido(null);
                    navigation.navigate('Inicio');
                }}
            />
            <ModalMensaje
                visible={pedirLogin}
                icono="person-circle-outline"
                titulo="Inicia sesión"
                mensaje="Para pagar tu pedido necesitas iniciar sesión. Tu carrito se mantiene guardado."
                textoBoton="Iniciar Sesión"
                onCerrar={() => {
                    setPedirLogin(false);
                    navigation.navigate('Login');
                }}
                textoSecundario="Cancelar"
                onSecundario={() => setPedirLogin(false)}
            />
            <FlatList
                data={items}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                ListHeaderComponent={encabezado}
                ListFooterComponent={pie}
                ListEmptyComponent={vacio}
                showsVerticalScrollIndicator={false}
            />
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
    titulo: {
        fontFamily: 'DynaPuff_400Regular',
        fontSize: 28,
        color: '#383896',
        textAlign: 'center',
        marginBottom: 16,
    },
    filaEncabezado: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: '#383896',
        paddingBottom: 4,
        marginBottom: 14,
    },
    textoEncabezado: {
        fontFamily: 'MontserratAlternates_400Regular',
        fontSize: 13,
        color: '#383896',
    },
    fila: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 16,
    },
    cajaImagen: {
        width: 72,
        height: 72,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: '#DCC2DF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imagen: {
        width: 56,
        height: 56,
        resizeMode: 'contain',
    },
    info: {
        flex: 1,
    },
    filaNombre: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    nombre: {
        flexShrink: 1,
        marginRight: 8,
        fontFamily: 'MontserratAlternates_700Bold',
        fontSize: 14,
        color: '#383896',
    },
    precio: {
        fontFamily: 'MontserratAlternates_700Bold',
        fontSize: 14,
        color: '#383896',
    },
    filaControles: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    contador: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    botonCantidad: {
        backgroundColor: '#DCC2DF',
        width: 26,
        height: 26,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    botonDeshabilitado: {
        opacity: 0.4,
    },
    cantidad: {
        fontFamily: 'MontserratAlternates_700Bold',
        fontSize: 14,
        color: '#383896',
        minWidth: 16,
        textAlign: 'center',
    },
    linea: {
        height: 1,
        backgroundColor: '#383896',
        marginTop: 4,
        marginBottom: 16,
    },
    filaTotal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    textoTotal: {
        fontFamily: 'MontserratAlternates_700Bold',
        fontSize: 16,
        color: '#383896',
    },
    montoTotal: {
        fontFamily: 'MontserratAlternates_700Bold',
        fontSize: 16,
        color: '#383896',
    },
    botonPagar: {
        backgroundColor: '#383896',
        paddingVertical: 14,
        borderRadius: 22,
        alignItems: 'center',
        width: '70%',
        alignSelf: 'center',
        marginBottom: 12,
    },
    textoBotonPagar: {
        color: '#fff',
        fontFamily: 'MontserratAlternates_700Bold',
        fontSize: 14,
    },
    vacio: {
        alignItems: 'center',
        marginTop: 24,
        gap: 12,
    },
    textoVacio: {
        fontFamily: 'MontserratAlternates_700Bold',
        fontSize: 16,
        color: '#383896',
        marginBottom: 8,
    },
});
