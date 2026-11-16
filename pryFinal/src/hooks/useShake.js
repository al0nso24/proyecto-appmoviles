import { useEffect, useRef } from 'react';
import { Accelerometer } from 'expo-sensors';

// Detecta una sacudida del celular (Semana 12): la fuerza total supera el umbral en g.
export default function useShake(alSacudir, umbral = 1.8) {
    const callback = useRef(alSacudir);
    useEffect(() => {
        callback.current = alSacudir;
    }, [alSacudir]);

    useEffect(() => {
        let suscripcion = null;
        let activo = true;
        let ultima = 0;

        Accelerometer.isAvailableAsync()
            .then((disponible) => {
                if (!disponible || !activo) return;
                Accelerometer.setUpdateInterval(200);
                suscripcion = Accelerometer.addListener(({ x, y, z }) => {
                    const fuerza = Math.sqrt(x * x + y * y + z * z);
                    const ahora = Date.now();
                    if (fuerza > umbral && ahora - ultima > 1000) {
                        ultima = ahora;
                        callback.current();
                    }
                });
            })
            .catch(() => {});

        return () => {
            activo = false;
            if (suscripcion) suscripcion.remove();
        };
    }, [umbral]);
}
