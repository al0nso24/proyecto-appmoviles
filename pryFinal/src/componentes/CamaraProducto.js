import React, { useRef, useState } from 'react';
import { Modal, View, Text, Image, TouchableOpacity, StyleSheet, Linking, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as FileSystem from 'expo-file-system/legacy';

const SIGUIENTE_FLASH = { off: 'on', on: 'off' };

async function guardarFoto(uriTemporal) {
    try {
        const carpeta = FileSystem.documentDirectory + 'productos/';
        await FileSystem.makeDirectoryAsync(carpeta, { intermediates: true });
        const destino = `${carpeta}${Date.now()}.jpg`;
        await FileSystem.copyAsync({ from: uriTemporal, to: destino });
        return destino;
    } catch {
        return uriTemporal;
    }
}

// Modal con la cámara
export default function CamaraProducto({ visible, onCerrar, onFoto }) {
    const [permission, requestPermission] = useCameraPermissions();
    const camaraRef = useRef(null);
    const [foto, setFoto] = useState(null);
    const [facing, setFacing] = useState('back');
    const [flash, setFlash] = useState('off');
    const [ocupado, setOcupado] = useState(false);

    const cerrar = () => {
        setFoto(null);
        onCerrar();
    };

    const tomar = async () => {
        if (!camaraRef.current || ocupado) return;
        setOcupado(true);
        try {
            const data = await camaraRef.current.takePictureAsync({ quality: 0.7 });
            setFoto(data.uri);
        } catch (error) {
            console.log('Error al tomar la foto:', error);
        } finally {
            setOcupado(false);
        }
    };

    const usar = async () => {
        setOcupado(true);
        const uri = await guardarFoto(foto);
        setOcupado(false);
        setFoto(null);
        onFoto(uri);
    };

    let contenido;
    if (!permission) {
        // pide permiso
        contenido = <ActivityIndicator color="#fff" size="large" />;
    } else if (!permission.granted) {
        // Sin permiso: aviso + botón (o Ajustes si ya no se puede preguntar)
        contenido = (
            <View style={styles.centro}>
                <Ionicons name="camera-outline" size={56} color="#fff" />
                <Text style={styles.aviso}>Necesitamos la cámara para tomar la foto del producto.</Text>
                <TouchableOpacity
                    style={styles.botonPrincipal}
                    onPress={permission.canAskAgain ? requestPermission : () => Linking.openSettings()}
                >
                    <Text style={styles.textoBoton}>{permission.canAskAgain ? 'Dar permiso' : 'Abrir ajustes'}</Text>
                </TouchableOpacity>
            </View>
        );
    } else if (foto) {
        // Vista previa de la foto tomada
        contenido = (
            <>
                <Image source={{ uri: foto }} style={styles.camara} />
                <View style={styles.barra}>
                    <TouchableOpacity style={styles.botonSecundario} onPress={() => setFoto(null)} disabled={ocupado}>
                        <Text style={styles.textoBoton}>Repetir</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.botonPrincipal} onPress={usar} disabled={ocupado}>
                        {ocupado ? <ActivityIndicator color="#fff" /> : <Text style={styles.textoBoton}>Usar foto</Text>}
                    </TouchableOpacity>
                </View>
            </>
        );
    } else {
        // Cámara en vivo
        contenido = (
            <>
                <CameraView ref={camaraRef} style={styles.camara} facing={facing} flash={flash} />
                <View style={styles.barra}>
                    <TouchableOpacity style={styles.botonRedondo} onPress={() => setFlash((f) => SIGUIENTE_FLASH[f])}>
                        <Ionicons name={flash === 'on' ? 'flash' : 'flash-off'} size={22} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.disparador} onPress={tomar} disabled={ocupado}>
                        {ocupado && <ActivityIndicator color="#383896" />}
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.botonRedondo}
                        onPress={() => setFacing((f) => (f === 'back' ? 'front' : 'back'))}
                    >
                        <Ionicons name="camera-reverse-outline" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>
            </>
        );
    }

    return (
        <Modal visible={visible} animationType="slide" onRequestClose={cerrar}>
            <View style={styles.contenedor}>
                <TouchableOpacity style={styles.cerrar} onPress={cerrar}>
                    <Ionicons name="close" size={28} color="#fff" />
                </TouchableOpacity>
                {contenido}
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    contenedor: { 
        flex: 1, 
        backgroundColor: '#000', 
        justifyContent: 'center' 
    },
    camara: { 
        flex: 1 
    },
    centro: { 
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: 32, 
        gap: 16 
    },
    aviso: { 
        color: '#fff', 
        textAlign: 'center', 
        fontFamily: 'MontserratAlternates_400Regular', 
        fontSize: 15 
    },
    cerrar: { 
        position: 'absolute', 
        top: 50, 
        right: 20, 
        zIndex: 10, 
        padding: 6, 
        backgroundColor: 'rgba(0,0,0,0.5)', 
        borderRadius: 20 
    },
    barra: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-around', 
        paddingVertical: 24, 
        paddingBottom: 40 
    },
    botonRedondo: { 
        width: 48, 
        height: 48, 
        borderRadius: 24, 
        backgroundColor: 'rgba(255,255,255,0.2)', 
        alignItems: 'center', 
        justifyContent: 'center' 
    },
    disparador: { 
        width: 72, 
        height: 72, 
        borderRadius: 36, 
        backgroundColor: '#fff', 
        borderWidth: 5, 
        borderColor: '#BDA6CE', 
        alignItems: 'center', 
        justifyContent: 'center' 
    },
    botonPrincipal: { 
        backgroundColor: '#383896', 
        paddingVertical: 12, 
        paddingHorizontal: 28, 
        borderRadius: 20, 
        alignItems: 'center', 
        minWidth: 130 
    },
    botonSecundario: { 
        borderWidth: 1, 
        borderColor: '#fff', 
        paddingVertical: 12, 
        paddingHorizontal: 28, 
        borderRadius: 20, 
        alignItems: 'center', 
        minWidth: 130 
    },
    textoBoton: { 
        color: '#fff', 
        fontFamily: 'MontserratAlternates_700Bold', 
        fontSize: 14 
    },
});