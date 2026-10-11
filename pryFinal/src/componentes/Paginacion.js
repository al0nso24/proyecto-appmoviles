import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

//pagActual = Página en la que estás
//totalActual = Número de las páginas en total
//cambiarPag = la función para cambiar de página (es setPaginaActual).
export default function Paginacion({pagActual, totalPag, cambiarPag}){
    return(
        <View style={styles.filaPaginacion}>
            {/*Botón Anterior*/}
            <TouchableOpacity
            //Si estás en la pag 1, el botón cambia a un estilo "desactivado"
            style={[styles.botonPagina, pagActual === 1 && styles.botonPaginaDesactivado]}
            //Si estás en la pag 1, el botón se desactiva
            disabled={pagActual===1}
            //-1 = página anterior
            onPress={() => cambiarPag(pagActual - 1)}
            >
                <Text style={styles.textoPagina}>
                    Anterior
                </Text>
            </TouchableOpacity>

            {/*Botón Siguiente*/}
            <TouchableOpacity
            //Si estás en la última página, el botón cambia a un estilo "desactivado"
            style={[styles.botonPagina, pagActual === totalPag && styles.botonPaginaDesactivado]}
            //Si estás en la última página, se desactiva
            disabled={pagActual === totalPag}
            //+1 = siguiente página
            onPress={() => cambiarPag(pagActual + 1)}
            >
                <Text style={styles.textoPagina}>
                    Siguiente
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    filaPaginacion: {
        flexDirection: 'row', //fila
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },

    botonPagina: {
        backgroundColor: '#383896',
        paddingVertical: 10,
        paddingHorizontal: 18,
        borderRadius: 16,
    },

    botonPaginaDesactivado: {
        backgroundColor: '#DCC2DF',
    },

    textoPagina: {
        color: '#fff',
        fontFamily: 'MontserratAlternates_700Bold', //fuente de la página
        fontSize: 14,
    },
});