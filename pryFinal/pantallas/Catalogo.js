import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import TarjetaProducto from '../src/componentes/TarjetaProducto';
import NavBar from '../src/componentes/NavBar';

export default function Inicio ({ navigation }) {
    const productos = [
        { id: 1, nombre: 'Chiikawa', precio: 'S/65.90', imagen: require('../imagenes/chiikawafondo.png')},
        { id: 2, nombre: 'Hachiware', precio: 'S/59.90', imagen: require('../imagenes/hachifondo.png')},
        { id: 3, nombre: 'Stormtropper', precio: 'S/59.90', imagen: require('../imagenes/stormfondo.png') },
        { id: 4, nombre: 'Darth Vader', precio: 'S/54.90', imagen: require('../imagenes/darthfondo.png') },
        { id: 5, nombre: 'Yoshi', precio: 'S/49.90', imagen: require('../imagenes/yoshifondo.png') },
        { id: 6, nombre: 'Kirby', precio: 'S/65.90', imagen: require('../imagenes/kirbyfondo.png') },
        { id: 7, nombre: 'Freddy Fazbear', precio: 'S/79.90', imagen: require('../imagenes/freddyfondo.png') },
        { id: 8, nombre: 'Triceratops', precio: 'S/74.90', imagen: require('../imagenes/tricepfondo.png') },
    ];

    const categorias = ['Todos', 'Animales', 'Anime', 'Juegos', 'Películas'];

    const [busqueda, setBusqueda] = useState('');

    const productosFiltrados = productos.filter((producto) =>
        producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <ScrollView style={styles.contenedor}>
            <NavBar navigation={navigation} />
            <Image source={require('../imagenes/tiendabanner.jpg')} style={styles.imagenBanner} />

            <Text style={styles.tituloSeccion}>Buscar Productos</Text>
            <TextInput
                style={styles.inputBuscador}
                placeholder="Buscar..."
                value={busqueda}
                onChangeText={setBusqueda}
            />

            <View style={styles.filaCategorias}>
                {categorias.map((categoria) => (
                <TouchableOpacity key={categoria} style={styles.botonCategoria}>
                    <Text style={styles.textoCategoria}>{categoria}</Text>
                </TouchableOpacity>
                ))}
            </View>

            <Text style={styles.tituloCatalogo}>Catálogo</Text>
            <View style={styles.filaProductos}>
                {productosFiltrados.map((producto) => (
                <TarjetaProducto
                    key={producto.id}
                    nombre={producto.nombre}
                    precio={producto.precio}
                    imagen={producto.imagen}
                />
                ))}
            </View>
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
        marginBottom: 16,
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
    },
    imagenBanner: {
        width: '100%',
        height: 120,
        borderRadius: 12,
        resizeMode: 'cover',
        marginBottom: 16,
    },
    tituloSeccion: {
        fontSize: 18,
        fontFamily: 'DynaPuff_400Regular',
        color: '#383896',
        marginBottom: 10,
    },
    inputBuscador: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#DCC2DF',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 10,
        marginBottom: 16,
        fontFamily: 'MontserratAlternates_400Regular',
    },
    filaCategorias: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 20,
    },
    botonCategoria: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#DCC2DF',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 16,
    },
    textoCategoria: {
        color: '#383896',
        fontFamily: 'MontserratAlternates_700Bold',
        fontSize: 13,
    },
    tituloCatalogo: {
        fontSize: 22,
        fontFamily: 'DynaPuff_400Regular',
        color: '#383896',
        marginBottom: 12,
        textAlign: 'center',
    },
    filaProductos: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
});
