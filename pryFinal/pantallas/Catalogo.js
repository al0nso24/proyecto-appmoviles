import React, { useState, useMemo, useCallback, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TarjetaProducto from '../src/componentes/TarjetaProducto';
import NavBar from '../src/componentes/NavBar';
import Paginacion from '../src/componentes/Paginacion';
import { productos, CATEGORIAS } from '../src/datos/productos';

const PRODUCTOS_POR_PAGINA = 8; 

//categoriaInicial = categoría con la que se abre (por ejemplo, al tocar una categoría en Inicio)
export default function Catalogo ({ navigation, categoriaInicial = 'Todos' }) {
    //useRef: referencias a la lista (para subir al inicio) y al buscador (para enfocarlo)
    const listaRef = useRef(null);
    const buscadorRef = useRef(null);

    const [busqueda, setBusqueda] = useState('');
    //Para el filtro de categorías
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(categoriaInicial);
    const [paginaActual, setPaginaActual] = useState(1);

    //useMemo: el filtro solo se vuelve a calcular cuando cambia la búsqueda o la categoría
    const productosFiltrados = useMemo(() => productos.filter((producto) => {
        const productoBuscado = producto.nombre.toLowerCase().includes(busqueda.toLowerCase());
        const categoriaBuscada = categoriaSeleccionada === 'Todos' || producto.categoria === categoriaSeleccionada;
        return productoBuscado && categoriaBuscada;
    }), [busqueda, categoriaSeleccionada]);

    const totalPaginas = Math.max(1, Math.ceil(productosFiltrados.length / PRODUCTOS_POR_PAGINA));

    const productosPaginados = useMemo(() => productosFiltrados.slice(
        (paginaActual - 1) * PRODUCTOS_POR_PAGINA,
        paginaActual * PRODUCTOS_POR_PAGINA
    ), [productosFiltrados, paginaActual]);

    //useCallback: estas funciones se crean una sola vez
    //Al cambiar de página, la lista sube al inicio
    const cambiarPagina = useCallback((pagina) => {
        setPaginaActual(pagina);
        listaRef.current?.scrollToOffset({ offset: 0, animated: true });
    }, []);

    //Resetea la página al filtrar
    const cambiarBusqueda = useCallback((texto) => {
        setBusqueda(texto); 
        setPaginaActual(1); 
    }, []);

    //Para cambiar categoría de peluches
    const cambiarCategoria = useCallback((categoria) => {
        setCategoriaSeleccionada(categoria); 
        setPaginaActual(1); 
    }, []);

    const limpiarBusqueda = useCallback(() => {
        setBusqueda('');
        setPaginaActual(1);
        buscadorRef.current?.focus();
    }, []);

    const encabezado = (
        <View>
            <NavBar navigation={navigation} />
            <Image source={require('../imagenes/tiendabanner.jpg')} style={styles.imagenBanner} />
            <Text style={styles.tituloSeccion}>Buscar Productos</Text>
            <View style={styles.cajaBuscador}>
                <TextInput
                    ref={buscadorRef}
                    style={styles.inputBuscador}
                    placeholder="Buscar..."
                    value={busqueda}
                    onChangeText={cambiarBusqueda}
                />
                {busqueda !== '' ? (
                    <TouchableOpacity style={styles.iconoBuscador} onPress={limpiarBusqueda}>
                        <Ionicons name="close-circle" size={20} color="#383896" />
                    </TouchableOpacity>
                ) : (
                    <View style={styles.iconoBuscador}>
                        <Ionicons name="search" size={18} color="#383896" />
                    </View>
                )}
            </View>
            <View style={styles.filaCategorias}>
                {CATEGORIAS.map((categoria) => (
                    <TouchableOpacity
                        key={categoria}
                        style={[
                            styles.botonCategoria,
                            categoriaSeleccionada === categoria && styles.botonCategoriaActivo,
                        ]}
                        onPress={() => cambiarCategoria(categoria)}>
                        <Text
                            style={[
                                styles.textoCategoria,
                                categoriaSeleccionada === categoria && styles.textoCategoriaActivo,
                            ]}
                        >
                            {categoria}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
            <Text style={styles.tituloCatalogo}>Catálogo</Text>
            <Text style={styles.contador}>
                Mostrando {productosPaginados.length} de {productosFiltrados.length} peluches
            </Text>
        </View>
    );

    return (
        <View style={styles.contenedor}>
            {/*FlatList: dibuja las tarjetas en 2 columnas*/}
            <FlatList
                ref={listaRef}
                data={productosPaginados}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                columnWrapperStyle={styles.columnas}
                renderItem={({ item }) => (
                    <TarjetaProducto producto={item} navigation={navigation} />
                )}
                ListHeaderComponent={encabezado}
                ListEmptyComponent={<Text style={styles.sinResultados}>No se encontraron peluches.</Text>}
                ListFooterComponent={
                    <Paginacion
                        //Se llama a los parámetros del componente Paginacion.js, luego se le pasan las variables de aquí para que funcione
                        pagActual={paginaActual}
                        totalPag={totalPaginas}
                        cambiarPag={cambiarPagina}
                    />
                }
                keyboardShouldPersistTaps="handled"
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
        paddingTop: 60, //esto es para la separación entre página y barra superior del celular
        paddingBottom: 60 //esto es para la separación entre página y barra inferior del celular
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
    cajaBuscador: {
        justifyContent: 'center',
        marginBottom: 16,
    },
    inputBuscador: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#DCC2DF',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingRight: 44,
        paddingVertical: 10,
        fontFamily: 'MontserratAlternates_400Regular',
    },
    iconoBuscador: {
        position: 'absolute',
        right: 14,
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
        marginBottom: 4,
        textAlign: 'center',
    },
    contador: {
        fontFamily: 'MontserratAlternates_400Regular',
        fontStyle: 'italic',
        fontSize: 12,
        color: '#555555',
        textAlign: 'center',
        marginBottom: 12,
    },
    columnas: {
        justifyContent: 'space-between',
    },
    sinResultados: {
        fontFamily: 'MontserratAlternates_400Regular',
        color: '#555555',
        textAlign: 'center',
        marginVertical: 24,
    },
    botonCategoriaActivo: {
        backgroundColor: '#383896',
        borderColor: '#383896',
    },
    textoCategoriaActivo: {
        color: '#fff',
    },
});
