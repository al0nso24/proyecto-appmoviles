import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Linking, AppState } from 'react-native';
import {
    estadoPermisoNotificaciones,
    pedirPermisoNotificaciones,
    programarNotificacion,
    obtenerToken,
} from '../servicios/notificaciones';

// Estado del permiso, reintento, notificación de prueba y token
export default function SeccionNotificaciones() {
    const [permiso, setPermiso] = useState(null); 
    const [proxima, setProxima] = useState(null);
    const [token, setToken] = useState(null);

    const refrescar = useCallback(async () => {
        const estado = await estadoPermisoNotificaciones();
        setPermiso(estado);
        if (estado.granted) setToken(await obtenerToken());
    }, []);

    useEffect(() => {
        refrescar();
        // Al volver de Ajustes se consulta el permiso otra vez
        const sub = AppState.addEventListener('change', (estado) => {
            if (estado === 'active') refrescar();
        });
        return () => sub.remove();
    }, [refrescar]);

    const avisarDenegado = (estado) => {
        Alert.alert(
            'Notificaciones desactivadas',
            'No podremos avisarte del estado de tus pedidos. Puedes activarlas cuando quieras.',
            estado.canAskAgain
                ? [{ text: 'Entendido' }]
                : [{ text: 'Cancelar', style: 'cancel' }, { text: 'Abrir ajustes', onPress: () => Linking.openSettings() }]
        );
    };

    const solicitar = async () => {
        if (permiso && !permiso.canAskAgain && !permiso.granted) {
            Linking.openSettings();
            return;
        }
        const estado = await pedirPermisoNotificaciones();
        setPermiso(estado);
        if (estado.granted) setToken(await obtenerToken());
        else avisarDenegado(estado);
    };

    const probar = async () => {
        const hora = await programarNotificacion('Kubi', '¡Así te avisaremos de tus pedidos! 🧸', 5);
        if (hora) setProxima(hora);
        else {
            const estado = await estadoPermisoNotificaciones();
            setPermiso(estado);
            avisarDenegado(estado);
        }
    };

    const concedido = permiso && permiso.granted;

    return (
        <View style={styles.caja}>
            <Text style={styles.titulo}>Notificaciones</Text>
            {permiso && (
                <Text style={[styles.estado, concedido ? styles.verde : styles.rojo]}>
                    {concedido ? 'Permiso concedido' : 'Permiso denegado'}
                </Text>
            )}
            {!concedido && (
                <TouchableOpacity style={styles.botonSecundario} onPress={solicitar}>
                    <Text style={styles.textoSecundario}>Solicitar permiso nuevamente</Text>
                </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.boton} onPress={probar}>
                <Text style={styles.textoBoton}>Probar notificación (5 s)</Text>
            </TouchableOpacity>
            {proxima && <Text style={styles.dato}>Próxima notificación: {proxima.toLocaleTimeString('es-PE')}</Text>}
            {concedido && <Text style={styles.dato}>Token: {token || 'Sin token (requiere development build)'}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    caja: { marginTop: 8, marginHorizontal: 16, marginBottom: 24, padding: 16, backgroundColor: '#fff', borderRadius: 14, borderWidth: 1, borderColor: '#DCC2DF' },
    titulo: { fontFamily: 'DynaPuff_400Regular', fontSize: 20, color: '#383896', textAlign: 'center', marginBottom: 8 },
    estado: { fontFamily: 'MontserratAlternates_700Bold', textAlign: 'center', marginBottom: 8 },
    verde: { color: '#1B7F3B' },
    rojo: { color: '#C0392B' },
    boton: { backgroundColor: '#383896', paddingVertical: 12, borderRadius: 12, alignItems: 'center', marginTop: 8 },
    textoBoton: { color: '#fff', fontFamily: 'MontserratAlternates_700Bold', fontSize: 14 },
    botonSecundario: { borderWidth: 1, borderColor: '#383896', paddingVertical: 10, borderRadius: 12, alignItems: 'center', marginTop: 4 },
    textoSecundario: { color: '#383896', fontFamily: 'MontserratAlternates_400Regular', fontSize: 14 },
    dato: { fontFamily: 'MontserratAlternates_400Regular', color: '#6E6EA8', fontSize: 12, marginTop: 8, textAlign: 'center' },
});
