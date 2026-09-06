import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import TarjetaProducto from '../src/componentes/TarjetaProducto';
import NavBar from '../src/componentes/NavBar';

export default function Inicio ({ navigation }) {
    const categorias = [
        { nombre: 'Animales', imagen: require('../imagenes/animal.png') },
        { nombre: 'Anime', imagen: require('../imagenes/anime.png') },
        { nombre: 'Juegos', imagen: require('../imagenes/games.png') },
        { nombre: 'Peliculas', imagen: require('../imagenes/movie.png') },
    ];

    const masVendidos = [
        { id: 1, nombre: 'Chiikawa', precio: 'S/65.90', imagen: require('../imagenes/chiikawafondo.png')},
        { id: 2, nombre: 'Hachiware', precio: 'S/59.90', imagen: require('../imagenes/hachifondo.png')},
    ];

    return (
        <ScrollView style={styles.contenedor}>
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
                    <TouchableOpacity style={styles.botonCategoria}>
                        <Image source={categoria.imagen} style={styles.imagenCategoria} />
                    </TouchableOpacity>
                    <Text style={styles.textoCategoria}>{categoria.nombre}</Text>
                </View>
                ))}
            </View>
            </View>

            <Text style={styles.tituloSeccion}>Más Vendidos</Text>
            <View style={styles.filaProductos}>
                {masVendidos.map((producto) => (
                    <TarjetaProducto
                        key={producto.id}
                        nombre={producto.nombre}
                        precio={producto.precio}
                        imagen={producto.imagen}
                    />
                ))}
            </View>

            <TouchableOpacity style={styles.botonSesion} onPress={() => navigation && navigation.navigate('Login')}>
                <Text style={styles.textoBotonSesion}>Iniciar Sesión</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botonRegistro} onPress={() => navigation && navigation.navigate('Registro')}>
                <Text style={styles.textoBotonRegistro}>Registrarse</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
        backgroundColor: '#FFF8F0',
        padding: 16,
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
    logo: {
        fontSize: 20,
        fontFamily: 'DynaPuff_400Regular',
        color: '#383896',
        fontWeight: '600',
    },
    bienvenida: {
        alignItems: 'center',
        marginBottom: 24,
    },
    titulo: {
        fontSize: 32,
        fontFamily: 'DynaPuff_400Regular',
        color: '#383896',
        fontWeight: '900',
    },
    tituloTienda: {
        fontSize: 20,
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
        aspectRatio: 1.4,        
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1.5,
        borderColor: '#DCC2DF',
        boxShadow: '0px 4px 4px #DCC2DF',
    },
    imagenCategoria: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
    },
    textoCategoria: {
        color: '#383896',
        fontFamily: 'MontserratAlternates_400Regular',
        fontSize: 14,
        fontWeight: '600',
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