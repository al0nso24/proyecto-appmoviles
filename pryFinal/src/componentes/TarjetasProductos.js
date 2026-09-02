import { Image } from "react-native";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function TarjetasProductos() {
    const productos = [
        { 
            id: 1, 
            nombre: "Chiikawa", 
            precio: 99.9, 
            imagen: require("../../imagenes/chii.jpg")
        },

        { 
            id: 2, 
            nombre: "Stormtrooper", 
            precio: 59.9,
            imagen: require("../../imagenes/stormtrooper.png")
        },

        { 
            id: 3, 
            nombre: "Yoshi", 
            precio: 49.9,
            imagen: require("../../imagenes/yoshi.jpeg")
        },

        { 
            id: 4, 
            nombre: "Kirby", 
            precio: 64.9,
            imagen: require("../../imagenes/kirby_.jpg")
        },
        
        { 
            id: 5, 
            nombre: "Hachiware", 
            precio: 50.9,
            imagen: require("../../imagenes/hachiware.jpg")
        },

        { 
            id: 6, 
            nombre: "Freddy Fazbear", 
            precio: 79.9,
            imagen: require("../../imagenes/fedi.jpg")
        },

        { 
            id: 7, 
            nombre: "Triceratops", 
            precio: 205.9,
            imagen: require("../../imagenes/triceratops.jpg")
        },

        { 
            id: 8, 
            nombre: "Darth Vader", 
            precio: 54.9,
            imagen: require("../../imagenes/darth-vader.jpg")
        }
    ];

    return (
        <View style={styles.container}>
            <FlatList
                data={productos}
                numColumns={2}
                keyExtractor={(prod) => prod.id.toString()}
                columnWrapperStyle={styles.columnWrapper}
                renderItem={({ item: prod }) => (
                    <View style={styles.card}>

                        <Image source={prod.imagen} style={styles.imagen}></Image>

                        <Text style={styles.nombre}>{prod.nombre}</Text>
                        <Text style={styles.precio}>S/ {prod.precio.toFixed(2)}</Text>

                        <TouchableOpacity style={styles.btn}>
                            <Text style={styles.btnTexto}>Comprar</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 2,
        width: "100%"  //Para que ocupe todo el ancho
    },

    columnWrapper: {  //Para definir el espacio entre tarjetas (2 por fila)
        gap: 6,
        marginBottom: 9,
    },

    card: {
        width: "49%",
        backgroundColor: "#f8f0ff",
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#e5d9f7",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 4,
        alignItems: "center",
        overflow: "hidden"  //Hace que la imagen respete el borde redondeado de la tarjeta
    },

    imagen: {
        marginBottom: 9,
        height: 168,
        width: "100%",
        resizeMode: "stretch"  //Para que la imagen se estire y ocupe todo el ancho de la tarjeta (y su tamaño original)
    },

    nombre: {
        color: "#4d2d8d",
        fontSize: 19,
        fontWeight: "700",
        textAlign: "center",
        marginBottom: 4,
    },

    precio: {
        color: "#4d2d8d",
        fontSize: 14,
        fontWeight: "700",
        textAlign: "center",
        marginBottom: 12,
    },

    btn: {
        backgroundColor: "#4d2d8d",
        borderRadius: 12,
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#3b1f6a",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 6,
        elevation: 5,
        marginBottom: 14
    },

    btnTexto: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 15,
    },
});