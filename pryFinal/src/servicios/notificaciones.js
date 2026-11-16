import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowBanner: true,
        shouldShowList: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

async function crearCanal() {
    if (Platform.OS !== 'android') return;
    try {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'General',
            importance: Notifications.AndroidImportance.MAX,
        });
    } catch {}
}

export async function estadoPermisoNotificaciones() {
    const { status, canAskAgain } = await Notifications.getPermissionsAsync();
    return { granted: status === 'granted', canAskAgain, status };
}

export async function pedirPermisoNotificaciones() {
    await crearCanal();
    const actual = await Notifications.getPermissionsAsync();
    if (actual.status === 'granted') return { granted: true, canAskAgain: actual.canAskAgain, status: actual.status };
    if (!actual.canAskAgain) return { granted: false, canAskAgain: false, status: actual.status };
    const { status, canAskAgain } = await Notifications.requestPermissionsAsync();
    return { granted: status === 'granted', canAskAgain, status };
}

// Notificación local
export async function programarNotificacion(titulo, cuerpo, segundos = 5) {
    const permiso = await pedirPermisoNotificaciones();
    if (!permiso.granted) return null;
    await Notifications.scheduleNotificationAsync({
        content: { title: titulo, body: cuerpo },
        trigger: {
            type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
            seconds: segundos,
            channelId: 'default',
        },
    });
    return new Date(Date.now() + segundos * 1000);
}

// Token push
export async function obtenerToken() {
    try {
        if (!Device.isDevice) return null;
        const projectId = Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
        if (!projectId) return null;
        return (await Notifications.getExpoPushTokenAsync({ projectId })).data;
    } catch {
        return null;
    }
}
