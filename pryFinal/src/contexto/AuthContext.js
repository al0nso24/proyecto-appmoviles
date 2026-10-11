import React, { createContext, useContext, useEffect, useState } from 'react';
import * as auth from '../servicios/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        auth.obtenerSesion()
            .then(setUsuario)
            .catch(() => setUsuario(null))
            .finally(() => setCargando(false));
    }, []);

    const registrarse = (datos) => auth.registrar(datos);

    const iniciarSesion = async (datos) => {
        const u = await auth.iniciarSesion(datos);
        setUsuario(u);
        return u;
    };

    const actualizarPerfil = async (datos) => {
        const u = await auth.actualizarPerfil(usuario.id, datos);
        setUsuario(u);
        return u;
    };

    const cerrarSesion = async () => {
        await auth.cerrarSesion();
        setUsuario(null);
    };

    return (
        <AuthContext.Provider
            value={{ usuario, cargando, registrarse, iniciarSesion, actualizarPerfil, cerrarSesion }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);