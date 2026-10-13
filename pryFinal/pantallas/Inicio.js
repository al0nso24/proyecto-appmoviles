import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import TarjetaProducto from '../src/componentes/TarjetaProducto';
import NavBar from '../src/componentes/NavBar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '../src/contexto/AuthContext';
import { productos, MAS_VENDIDOS } from '../src/datos/productos';

export default function Inicio ({ navigation }) {
    //Se trae la info del usuario desde el contexto de autenticación
    //useAuth() es un hook que devuelve los datos del login/usuario
    const { usuario } = useAuth();

    //Categorías de los peluches
    const categorias = [
        { nombre: 'Animales', icono: 'paw' },
        { nombre: 'Anime', icono: 'star-four-points-outline' },
        { nombre: 'Juegos', icono: 'gamepad-variant-outline' },
        { nombre: 'Películas', icono: 'movie-open-outline' },
    ];

    //Peluches más vendidos
    const masVendidos = productos.filter((producto) => MAS_VENDIDOS.includes(producto.id));

    return (
        <View style={styles.contenedor}>
            <ScrollView>
                <NavBar navigation={navigation} />
                <View style={styles.bienvenida}>
                    <Image source={require('../imagenes/bannerinicio.png')} style={styles.imagenBanner} />
                    <Text style={styles.tituloTienda}>Tienda de Peluches - Kubi</Text>
                    <Text style={styles.subtitulo}>Descubre a tu nuevo mejor amigo</Text>
                    <TouchableOpacity style={styles.botonCatalogo} onPress={() => navigation && navigation.navigate('Catalogo')}>
                        <Text style={styles.textoBoton}>Catálogo</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.tituloSeccion}>Categorías</Text>
                <View style={styles.contenedorCategorias}>
                    <View style={styles.filaCategorias}>
                        {categorias.map((categoria) => (
                        <View key={categoria.nombre} style={styles.itemCategoria}>
                            {/*Al tocar una categoría se abre el catálogo ya filtrado*/}
                            <TouchableOpacity
                            style={styles.botonCategoria}
                            onPress={() => navigation && navigation.navigate('Catalogo', { categoria: categoria.filtro })}
                            >
                            <MaterialCommunityIcons name={categoria.icono} size={58} color="#383896" />
                            </TouchableOpacity>
                            <Text style={styles.textoCategoria}>{categoria.nombre}</Text>
                        </View>
                        ))}
                    </View>
                </View>

                <Text style={styles.tituloSeccion}>Más Vendidos</Text>
                <View style={styles.filaProductos}>
                    {/*Se pasa el parámetro "producto" de TarjetaProducto*/}
                    {masVendidos.map((producto) => (
                        <TarjetaProducto
                            key={producto.id} //id único
                            //Esto pasa el objeto completo del producto al componente TarjetaProducto
                            producto={producto}
                            //Parámetro de navegación
                            navigation={navigation}
                        />
                    ))}
                </View>
                {/*Si no hay usuario logueado, se muestran estos 2 botones*/}
                {!usuario && (
                    <>
                        <TouchableOpacity style={styles.botonSesion} onPress={() => navigation && navigation.navigate('Login')}>
                            <Text style={styles.textoBotonSesion}>Iniciar Sesión</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.botonRegistro} onPress={() => navigation && navigation.navigate('Registro')}>
                            <Text style={styles.textoBotonRegistro}>Registrarse</Text>
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
        paddingTop: 60, //esto es para la separación entre página y barra superior del celular
        paddingBottom: 60 //esto es para la separación entre página y barra inferior del celular
    },

    encabezado: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#BDA6CE',
        padding: 10,
        borderRadius: 10,
        marginBottom: 5,
    },

    imagenLogo: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
    },

    bienvenida: {
        alignItems: 'center',
        marginBottom: 24,
    },

    tituloTienda: {
        fontSize: 28,
        fontFamily: 'DynaPuff_400Regular',
        marginTop: 12,
        color: '#383896',
    },

    subtitulo: {
        fontFamily: 'MontserratAlternates_400Regular',
        color: '#555',
        marginTop: 4,
        textAlign: 'center',
    },

    imagenBanner: {
        width: '80%',
        height: 220,
        resizeMode: 'cover',
        marginTop: 2,
    },

    botonCatalogo: {
        backgroundColor: '#383896',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 20,
        marginTop: 16,
    },

    textoBoton: {
        color: '#fff',
        fontFamily: 'MontserratAlternates_700Bold',
    },

    tituloSeccion: {
        fontSize: 22,
        fontFamily: 'DynaPuff_400Regular',
        color: '#383896',
        marginBottom: 12,
        textAlign: 'center',
    },

    contenedorCategorias: {
        width: '85%',
        alignSelf: 'center',
        marginBottom: 24,
    },

    filaCategorias: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },

    itemCategoria: {
        width: '48%',
        alignItems: 'center',
        marginBottom: 14,
    },

    botonCategoria: {
        backgroundColor: '#fff',
        width: '100%',
        aspectRatio: 1.6,        
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1.5,
        borderColor: '#DCC2DF',
        boxShadow: '0px 4px 4px #DCC2DF',
    },

    textoCategoria: {
        color: '#383896',
        fontFamily: 'MontserratAlternates_700Bold',
        fontSize: 14,
        marginTop: 15,           
    },

    filaProductos: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 24,
        
    },

    botonSesion: {
        backgroundColor: '#383896',
        paddingVertical: 12,
        borderRadius: 20,
        alignItems: 'center',
        marginBottom: 10,
        width: '85%',
        alignSelf: 'center',
    },

    textoBotonSesion: {
        color: '#fff',
        fontFamily: 'MontserratAlternates_700Bold',
    },

    botonRegistro: {
        backgroundColor: '#383896',
        paddingVertical: 12,
        borderRadius: 20,
        alignItems: 'center',
        marginBottom: 10,
        width: '85%',
        alignSelf: 'center',
    },
    
    textoBotonRegistro: {
        color: '#fff',
        fontFamily: 'MontserratAlternates_700Bold',
    },
});