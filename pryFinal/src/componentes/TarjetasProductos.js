import { Image } from "react-native";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function TarjetasProductos() {
    const productos = [
        { 
            id: 1, 
            nombre: "Chiikawa", 
            precio: 99.9, 
            imagen: require("../../imagenes/chiikawa-peluche.jpg")
        },

        { 
            id: 2, 
            nombre: "Conejito Dulce", 
            precio: 49.9, 
            emoji: "🐰",
        },

        { 
            id: 3, 
            nombre: "Perrito Miel", 
            precio: 54.9, 
            emoji: "🐶",
        },

        { 
            id: 4, 
            nombre: "Elefantito Nube", 
            precio: 64.9, 
            emoji: "🐘", 
        },
        
        { 
            id: 5, 
            nombre: "Osito Beige", 
            precio: 44.9, 
            emoji: "🧸",
        },

        { 
            id: 6, 
            nombre: "Conejita Rosa", 
            precio: 49.9, 
            emoji: "🐰",
        },

        { 
            id: 7, 
            nombre: "Osito Hoodie", 
            precio: 69.9, 
            emoji: "🧸",
        },

        { 
            id: 8, 
            nombre: "Gatito Kuby", 
            precio: 54.9, 
            emoji: "🐱",
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
        padding: 10,
    },

    columnWrapper: {
        justifyContent: "space-between",
        marginBottom: 16,
    },

    card: {
        width: "48%",
        backgroundColor: "#f8f0ff",
        borderRadius: 22,
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
        marginBottom: 12,
        width: "100%",
        height: 130,
    },

    nombre: {
        color: "#4d2d8d",
        fontSize: 19,
        fontWeight: "800",
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