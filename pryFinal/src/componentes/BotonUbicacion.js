import React, { useState } from 'react';
import { Text, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';

// Botón que llena la dirección con el GPS (Semanas 12 y 13). Devuelve el texto con onDireccion().
export default function BotonUbicacion({ onDireccion }) {
    const [buscando, setBuscando] = useState(false);
    const [error, setError] = useState('');

    const usarUbicacion = async () => {
        setError('');
        setBuscando(true);
        try {
            // Consultar → solicitar → reaccionar
            let permiso = await Location.getForegroundPermissionsAsync();
            if (!permiso.granted && permiso.canAskAgain) {
                permiso = await Location.requestForegroundPermissionsAsync();
            }
            if (!permiso.granted) {
                Alert.alert(
                    'Ubicación desactivada',
                    'Sin el permiso puedes escribir tu dirección a mano.',
                    permiso.canAskAgain
                        ? [{ text: 'Entendido' }]
                        : [{ text: 'Cancelar', style: 'cancel' }, { text: 'Abrir ajustes', onPress: () => Linking.openSettings() }]
                );
                return;
            }
            const pos = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
            const { latitude, longitude } = pos.coords;
            let texto = `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
            try {
                const [lugar] = await Location.reverseGeocodeAsync({ latitude, longitude });
                if (lugar) {
                    const calle = [lugar.street, lugar.streetNumber].filter(Boolean).join(' ');
                    const zona = [lugar.district || lugar.subregion, lugar.city].filter(Boolean).join(', ');
                    const armada = [calle, zona].filter(Boolean).join(', ');
                    if (armada) texto = armada;
                }
            } catch {}
            onDireccion(texto);
        } catch (e) {
            setError('No se pudo obtener tu ubicación. Revisa que el GPS esté activado.');
        } finally {
            setBuscando(false);
        }
    };

    return (
        <>
            <TouchableOpacity style={styles.boton} onPress={usarUbicacion} disabled={buscando}>
                {buscando ? (
                    <ActivityIndicator color="#383896" />
                ) : (
                    <>
                        <Ionicons name="location-outline" size={18} color="#383896" />
                        <Text style={styles.texto}>Usar mi ubicación actual</Text>
                    </>
                )}
            </TouchableOpacity>
            {error !== '' && <Text style={styles.error}>{error}</Text>}
        </>
    );
}

const styles = StyleSheet.create({
    boton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        marginHorizontal: 16,
        marginBottom: 8,
        paddingVertical: 8,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#DCC2DF',
        backgroundColor: '#fff',
    },
    texto: { fontFamily: 'MontserratAlternates_400Regular', color: '#383896', fontSize: 14 },
    error: { fontFamily: 'MontserratAlternates_400Regular', color: '#C0392B', marginHorizontal: 16, marginBottom: 8, fontSize: 13 },
});
