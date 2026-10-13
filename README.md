# Kuby – Tienda de Peluches

Aplicación móvil de una tienda de peluches, desarrollada con React Native y Expo. El diseño de las pantallas se hizo primero en Figmay luego se implementó en código.

---

## 1. Propósito del proyecto

Kuby permite a una persona explorar el catálogo de peluches de una tienda, buscarlos y filtrarlos por categoría, ver el detalle de cada producto, crear una cuenta, iniciar sesión, administrar su perfil y armar su carrito de compras. Los datos de usuarios y del carrito se guardan en el dispositivo, así que no necesita un servidor para funcionar.

## 2. Objetivos del avance

- Diseñar en Figma las pantallas de la app: Inicio, Catálogo, Login, Registro, NavBar, Perfil, Detalle de producto y Carrito.
- Implementar en React Native (Expo) las pantallas y la navegación entre ellas.
- Mostrar el catálogo con buscador, filtro por categorías y paginación.
- Implementar el registro e inicio de sesión de usuarios, con la sesión guardada en el dispositivo y contraseñas cifradas (sal + SHA-256).
- Implementar el carrito de compras: agregar productos, cambiar cantidades, quitar productos y ver el total, guardado con **AsyncStorage**.
- Aplicar los conceptos vistos en clase: `useState`, `useEffect`, `useContext`/`createContext`, `useRef`, `useMemo`, `useCallback`, `FlatList`, `filter()` y `AsyncStorage`.
- Dejar una documentación inicial del proyecto (este README).

## 3. Tecnologías y dependencias

| Dependencia | Para qué se usa |
|---|---|
| `expo` (~54) | Entorno para ejecutar y probar la app sin configurar Android Studio o Xcode |
| `react` 19.1 y `react-native` 0.81 | Interfaz y componentes móviles |
| `@react-native-async-storage/async-storage` | Guardar usuarios, sesión y carrito en el dispositivo |
| `expo-crypto` | Generar la sal y el hash SHA-256 de las contraseñas |
| `expo-font` | Cargar las tipografías |
| `@expo-google-fonts/montserrat-alternates` y `@expo-google-fonts/dynapuff` | Tipografías del diseño |
| `@expo/vector-icons` | Íconos (menú, carrito, categorías, etc.) |
| `react-dom` y `react-native-web` | Ejecutar la app también en el navegador |

## 4. Requisitos previos

- [Node.js](https://nodejs.org/) (versión LTS) y npm
- Git
- La app Expo Go en tu celular (Android o iOS), o un emulador de Android/iOS, o un navegador para la versión web

## 5. Instalación

```bash
# 1. Clonar el repositorio y entrar a la carpeta de la app
git clone <URL-del-repositorio>
cd proyecto-appmoviles/pryFinal

# 2. Instalar todas las dependencias del proyecto
npm install
```

El proyecto ya trae sus dependencias declaradas en `package.json`, por lo que `npm install` es suficiente. Si necesitas instalarlas desde cero en un proyecto Expo nuevo, estos son los comandos (`expo install` elige la versión compatible con tu versión de Expo):

```bash
npx expo install expo-font expo-crypto @react-native-async-storage/async-storage @expo/vector-icons react-dom react-native-web
npm install @expo-google-fonts/montserrat-alternates @expo-google-fonts/dynapuff

## 6. Ejecución

Desde la carpeta `pryFinal`:

```bash
npx expo start
```

Se abrirá el servidor de desarrollo y podrás elegir cómo ver la app:

- En tu celular:escanea el código QR con la app Expo Go(el celular y la computadora deben estar en la misma red Wi-Fi).
- Android: presiona `a` en la terminal (requiere un emulador abierto).
- iOS:presiona `i` en la terminal (solo en macOS).
- Navegador: presiona `w` en la terminal.

También puedes usar los scripts de `package.json`:

```bash
npm run android
npm run ios
npm run web
```

Si la app se comporta raro después de cambiar archivos o dependencias, reinicia limpiando la caché con `npx expo start -c`.

## 7. Funcionalidades

| Pantalla | Qué hace |
|---|---|
| Inicio | Bienvenida, categorías (abren el catálogo filtrado) y peluches más vendidos |
| Catálogo| Lista en 2 columnas con buscador, filtro por categoría y paginación de 8 productos |
| Detalle de producto | Información del peluche, contador de cantidad y botón para agregar al carrito |
| Carrito | Productos con cantidad (− / +), eliminar, total estimado y botón Pagar pedido |
| Login | Inicio de sesión con validaciones, mensajes de error y estado de carga |
| Registro| Creación de cuenta con validación de datos y confirmación de contraseña |
| Perfil | Datos del usuario, edición de nombre, teléfono y dirección, y cierre de sesión |
| Menú (NavBar)| Barra superior y menú de navegación, con una insignia con la cantidad del carrito |

## 8. Estructura del proyecto

```
pryFinal/
├── App.js                      Carga fuentes y sesión, y decide qué pantalla mostrar
├── index.js                    Punto de entrada de Expo
├── pantallas/                  Pantallas de la app
│   ├── Inicio.js
│   ├── Catalogo.js
│   ├── Carrito.js
│   ├── Login.js
│   ├── Registro.js
│   └── Perfil.js
├── src/
│   ├── componentes/            Piezas reutilizables
│   │   ├── NavBar.js
│   │   ├── TarjetaProducto.js
│   │   ├── DetalleProducto.js
│   │   ├── Paginacion.js
│   │   └── ModalMensaje.js
│   ├── contexto/
│   │   ├── AuthContext.js      Estado global del usuario
│   │   └── CarritoContext.js   Estado global del carrito
│   ├── servicios/
│   │   └── authService.js      Registro, login y perfil (AsyncStorage)
│   ├── datos/
│   │   └── productos.js        Lista de peluches y categorías
└── imagenes/                   Logo, banners e imágenes de los peluches
```

## 9. Estado actual y pendientes

Implementado:navegación entre pantallas, catálogo con búsqueda, filtro y paginación, detalle de producto, registro, inicio de sesión, perfil y carrito persistente.


## 10. Notas

- Para probar la app, primero crea una cuenta desde Registro. Los usuarios se guardan en el dispositivo, así que se pierden si se borran los datos de la app.
- El carrito de una persona sin sesión se pasa a su cuenta al iniciar sesión.
