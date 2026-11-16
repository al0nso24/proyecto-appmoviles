import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import NavBar from '../src/componentes/NavBar';
import { useAuth } from '../src/contexto/AuthContext';
import { leerPedidosDeUsuario } from '../src/servicios/pedidosService';

export default function MisPedidos({ navigation }) {
    const { usuario } = useAuth();
    const [pedidos, setPedidos] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        if (!usuario) {
            setCargando(false);
            return;
        }
        leerPedidosDeUsuario(usuario.id)
            .then(setPedidos)
            .finally(() => setCargando(false));
    }, [usuario]);

    // Sin sesión: se pide iniciar sesión
    if (!usuario) {
        return (
            <View style={styles.contenedor}>
                <NavBar navigation={navigation} />
                <View style={styles.centro}>
                    <Ionicons name="lock-closed-outline" size={56} color="#BDA6CE" />
                    <Text style={styles.titulo}>Mis pedidos</Text>
                    <Text style={styles.mensaje}>Inicia sesión para ver los pedidos que hiciste.</Text>
                    <TouchableOpacity style={styles.boton} onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.textoBoton}>Iniciar sesión</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
                        <Text style={styles.enlace}>¿No tienes cuenta? Regístrate</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.contenedor}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <NavBar navigation={navigation} />
                <Text style={styles.titulo}>Mis pedidos</Text>

                {cargando ? (
                    <ActivityIndicator color="#383896" style={{ marginTop: 24 }} />
                ) : pedidos.length === 0 ? (
                    <View style={styles.centro}>
                        <Ionicons name="receipt-outline" size={56} color="#BDA6CE" />
                        <Text style={styles.mensaje}>Todavía no has hecho ningún pedido.</Text>
                        <TouchableOpacity style={styles.boton} onPress={() => navigation.navigate('Catalogo')}>
                            <Text style={styles.textoBoton}>Ir al catálogo</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    pedidos.map((pedido) => (
                        <View key={pedido.id} style={styles.tarjeta}>
                            <View style={styles.cabecera}>
                                <Text style={styles.fecha}>{new Date(pedido.fecha).toLocaleString('es-PE')}</Text>
                                <Text style={styles.total}>S/ {pedido.total.toFixed(2)}</Text>
                            </View>
                            {pedido.items.map((item) => (
                                <View key={item.id} style={styles.fila}>
                                    <Text style={styles.item} numberOfLines={1}>
                                        {item.cantidad} x {item.nombre}
                                    </Text>
                                    <Text style={styles.subtotal}>S/ {(item.precio * item.cantidad).toFixed(2)}</Text>
                                </View>
                            ))}
                        </View>
                    ))
                )}
                <View style={{ height: 40 }} />
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
    centro: { 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: 24, 
        gap: 12, 
        flex: 1 
    },
    titulo: { 
        fontFamily: 'DynaPuff_400Regular', 
        fontSize: 26, 
        color: '#383896', 
        textAlign: 'center', 
        marginVertical: 12 
    },
    mensaje: { 
        fontFamily: 'MontserratAlternates_400Regular', 
        color: '#6E6EA8', 
        fontSize: 15, 
        textAlign: 'center' 
    },
    boton: { 
        backgroundColor: '#383896', 
        paddingVertical: 12, 
        paddingHorizontal: 32, 
        borderRadius: 20, 
        marginTop: 8 
    },
    textoBoton: { 
        color: '#fff', 
        fontFamily: 'MontserratAlternates_700Bold', 
        fontSize: 15 
    },
    enlace: { 
        fontFamily: 'MontserratAlternates_400Regular', 
        color: '#383896', 
        textDecorationLine: 'underline', 
        marginTop: 4 
    },
    tarjeta: { 
        backgroundColor: '#fff', 
        borderRadius: 12, 
        borderWidth: 1.5, 
        borderColor: '#DCC2DF', 
        padding: 14, 
        marginBottom: 12 
    },
    cabecera: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        borderBottomWidth: 1, 
        borderBottomColor: '#EADCF0', 
        paddingBottom: 8, 
        marginBottom: 8 
    },
    fecha: { 
        fontFamily: 'MontserratAlternates_400Regular', 
        color: '#6E6EA8', 
        fontSize: 13 
    },
    total: { 
        fontFamily: 'MontserratAlternates_700Bold', 
        color: '#383896', 
        fontSize: 16 
    },
    fila: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        paddingVertical: 3 
    },
    item: { 
        flex: 1, 
        fontFamily: 'MontserratAlternates_400Regular', 
        color: '#383896', 
        fontSize: 14, 
        marginRight: 8 
    },
    subtotal: { 
        fontFamily: 'MontserratAlternates_400Regular', 
        color: '#6E6EA8', 
        fontSize: 14 
    },
});