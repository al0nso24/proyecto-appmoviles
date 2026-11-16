import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';

const CLAVE_USUARIOS = 'kubi_usuarios';
const CLAVE_SESION = 'kubi_sesion';

const REGEX_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REGEX_TELEFONO = /^[0-9+\s-]{7,15}$/;

const normalizarCorreo = (correo) => String(correo || '').trim().toLowerCase();

// Cuenta de administrador que se crea sola la primera vez (solo para pruebas del curso)
export const ADMIN_CORREO = 'admin@kuby.com';
const ADMIN_PASSWORD = 'Admin123';

const usuarioPublico = ({ id, nombre, correo, telefono, direccion, rol }) => ({
    id,
    nombre,
    correo,
    telefono,
    direccion,
    rol: rol || 'cliente',
});

async function generarSal() {
    const bytes = await Crypto.getRandomBytesAsync(16);
    return Array.from(bytes).map((b) => b.toString(16).padStart(2, '0')).join('');
}

async function hashear(password, sal) {
    return Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, sal + password);
}

async function leerUsuarios() {
    try {
        const raw = await AsyncStorage.getItem(CLAVE_USUARIOS);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

// Crea el administrador si todavía no existe
export async function asegurarAdmin() {
    const usuarios = await leerUsuarios();
    if (usuarios.some((u) => u.correo === ADMIN_CORREO)) return;
    const sal = await generarSal();
    const admin = {
        id: 'admin',
        nombre: 'Administrador',
        correo: ADMIN_CORREO,
        rol: 'admin',
        sal,
        hash: await hashear(ADMIN_PASSWORD, sal),
    };
    await AsyncStorage.setItem(CLAVE_USUARIOS, JSON.stringify([...usuarios, admin]));
}

export async function contarUsuarios() {
    const usuarios = await leerUsuarios();
    return usuarios.filter((u) => u.rol !== 'admin').length;
}

export async function registrar({ nombre, correo, password }) {
    nombre = (nombre || '').trim();
    correo = normalizarCorreo(correo);

    if (nombre.length < 2) throw new Error('Ingresa tu nombre completo.');
    if (!REGEX_CORREO.test(correo)) throw new Error('Ingresa un correo electrónico válido.');
    if (!password || password.length < 6) throw new Error('La contraseña debe tener al menos 6 caracteres.');

    const usuarios = await leerUsuarios();
    if (usuarios.some((u) => u.correo === correo)) {
        throw new Error('Ya existe una cuenta con ese correo.');
    }

    const sal = await generarSal();
    const nuevo = {
        id: Date.now().toString(),
        nombre,
        correo,
        rol: 'cliente',
        sal,
        hash: await hashear(password, sal),
    };

    await AsyncStorage.setItem(CLAVE_USUARIOS, JSON.stringify([...usuarios, nuevo]));
    return usuarioPublico(nuevo);
}

export async function iniciarSesion({ correo, password }) {
    correo = normalizarCorreo(correo);

    if (!correo || !password) throw new Error('Ingresa tu correo y contraseña.');

    // Por si la cuenta admin no se creó al abrir la app, se asegura aquí también
    try {
        await asegurarAdmin();
    } catch (e) {
        console.log('No se pudo crear el admin:', e);
    }

    const usuarios = await leerUsuarios();
    const usuario = usuarios.find((u) => u.correo === correo);
    const hash = usuario ? await hashear(password, usuario.sal) : null;

    if (!usuario || hash !== usuario.hash) {
        throw new Error('Correo o contraseña incorrectos.');
    }

    await AsyncStorage.setItem(CLAVE_SESION, usuario.id);
    return usuarioPublico(usuario);
}

export async function obtenerSesion() {
    const id = await AsyncStorage.getItem(CLAVE_SESION);
    if (!id) return null;
    const usuarios = await leerUsuarios();
    const usuario = usuarios.find((u) => u.id === id);
    return usuario ? usuarioPublico(usuario) : null;
}

export async function actualizarPerfil(id, { nombre, telefono, direccion }) {
    nombre = (nombre || '').trim();
    telefono = (telefono || '').trim();
    direccion = (direccion || '').trim();

    if (nombre.length < 2) throw new Error('Ingresa tu nombre completo.');
    if (telefono && !REGEX_TELEFONO.test(telefono)) throw new Error('Ingresa un teléfono válido.');

    const usuarios = await leerUsuarios();
    const i = usuarios.findIndex((u) => u.id === id);
    if (i === -1) throw new Error('No se encontró la cuenta.');

    usuarios[i] = { ...usuarios[i], nombre, telefono, direccion };
    await AsyncStorage.setItem(CLAVE_USUARIOS, JSON.stringify(usuarios));
    return usuarioPublico(usuarios[i]);
}

export async function cerrarSesion() {
    await AsyncStorage.removeItem(CLAVE_SESION);
}