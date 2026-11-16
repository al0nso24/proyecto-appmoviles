import React, { useState } from 'react';
import { useFonts } from 'expo-font';
import { MontserratAlternates_400Regular, MontserratAlternates_700Bold } from '@expo-google-fonts/montserrat-alternates';
import { DynaPuff_400Regular } from '@expo-google-fonts/dynapuff';
import Inicio from './src/pantallas/Inicio';
import Catalogo from './src/pantallas/Catalogo';
import Login from './src/pantallas/Login';
import Registro from './src/pantallas/Registro';
import { AuthProvider, useAuth } from './src/contexto/AuthContext';
import { CarritoProvider } from './src/contexto/CarritoContext';
import Carrito from './src/pantallas/Carrito';
import Perfil from './src/pantallas/Perfil';
import DetalleProducto from './src/componentes/DetalleProducto';
import { ProductosProvider } from './src/contexto/ProductosContext';
// import AdminDashboard from './pantallas/AdminDashboard';
// import AdminProductos from './pantallas/AdminProductos';
// import AdminProductoForm from './pantallas/AdminProductoForm';
import './src/servicios/notificaciones'; // registra el manejador global de notificaciones

function Pantallas() {
  //Fuentes de la página
  const [fuentesListas] = useFonts({
    MontserratAlternates_400Regular,
    MontserratAlternates_700Bold,
    DynaPuff_400Regular,
  });

  //Si la autenticación todavía está cargando datos del usuario
  const { cargando, usuario } = useAuth();
  
  //"Inicio" = pantalla por defecto
  const [pantallaActual, setPantallaActual] = useState('Inicio');

  //Ver el datalle del peluche seleccionado
  //Empieza con null
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  const [categoriaInicial, setCategoriaInicial] = useState('Todos');

  //Producto que se edita en el panel de administrador (null = nuevo)
  const [productoEditando, setProductoEditando] = useState(null);
  
  const navigation = {
    navigate: (pantalla, parametros) => {
      if (pantalla === 'DetalleProducto') {
        setProductoSeleccionado(parametros.producto);
      }
      if (pantalla === 'AdminProductoForm') {
        setProductoEditando((parametros && parametros.producto) || null);
      }
      if (pantalla === 'Catalogo') {
        setCategoriaInicial((parametros && parametros.categoria) || 'Todos');
      }
      setPantallaActual(pantalla);
    },
    goBack: () => setPantallaActual('Catalogo'), //volver a catálogo
  };

  //Si las fuentes todavía aún no cargan, la app no renderiza nada
  if (!fuentesListas || cargando) {
    return null;
  }

  //Pantallas del administrador: solo entra quien tiene rol "admin"
  // if (pantallaActual.startsWith('Admin')) {
  //   if (!usuario || usuario.rol !== 'admin') {
  //     return <Inicio navigation={navigation} />;
  //   }
  //   if (pantallaActual === 'AdminProductos') return <AdminProductos navigation={navigation} />;
  //   if (pantallaActual === 'AdminProductoForm') {
  //     return <AdminProductoForm navigation={navigation} producto={productoEditando} />;
  //   }
  //   return <AdminDashboard navigation={navigation} />;
  // }

  if (pantallaActual === 'Catalogo') {
    return <Catalogo navigation={navigation} categoriaInicial={categoriaInicial} />;
  }

  if (pantallaActual === 'DetalleProducto') {
    return (
      <DetalleProducto
        navigation={navigation}
        producto={productoSeleccionado}
      />
    );
  }

  if (pantallaActual === 'Carrito') {
    return <Carrito navigation={navigation} />;
  }

  if (pantallaActual === 'Login') {
    return <Login navigation={navigation} />;
  }

  if (pantallaActual === 'Registro') {
    return <Registro navigation={navigation} />;
  }

  if (pantallaActual === 'Perfil') {
    return <Perfil navigation={navigation} />;
  }

  //Pantalla por defecto
  return <Inicio navigation={navigation} />;
}

export default function App() {
  return (
    <AuthProvider>
      <ProductosProvider>
        <CarritoProvider>
          <Pantallas />
        </CarritoProvider>
      </ProductosProvider>
    </AuthProvider>
  );
}