import React, { useState } from 'react';
import { useFonts } from 'expo-font';
import { MontserratAlternates_400Regular, MontserratAlternates_700Bold } from '@expo-google-fonts/montserrat-alternates';
import { DynaPuff_400Regular } from '@expo-google-fonts/dynapuff';
import Inicio from './pantallas/Inicio';
import Catalogo from './pantallas/Catalogo';
import Login from './pantallas/Login';
import Registro from './pantallas/Registro';
import { AuthProvider, useAuth } from './src/contexto/AuthContext';
import Perfil from './pantallas/Perfil';
import DetalleProducto from './src/componentes/DetalleProducto';

function Pantallas() {
  //Fuentes de la página
  const [fuentesListas] = useFonts({
    MontserratAlternates_400Regular,
    MontserratAlternates_700Bold,
    DynaPuff_400Regular,
  });

  //Si la autenticación todavía está cargando datos del usuario
  const { cargando } = useAuth();
  
  //"Inicio" = pantalla por defecto
  const [pantallaActual, setPantallaActual] = useState('Inicio');

  //Ver el datalle del peluche seleccionado
  //Empieza con null
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  
  const navigation = {
    navigate: (pantalla, parametros) => {
      if (pantalla === 'DetalleProducto') {
        setProductoSeleccionado(parametros.producto);
      }
      setPantallaActual(pantalla);
    },
    goBack: () => setPantallaActual('Catalogo'), //volver a catálogo
  };

  //Si las fuentes todavía aún no cargan, la app no renderiza nada
  if (!fuentesListas || cargando) {
    return null;
  }

  if (pantallaActual === 'Catalogo') {
    return <Catalogo navigation={navigation} />;
  }

  if (pantallaActual === 'DetalleProducto') {
    return (
      <DetalleProducto
        navigation={navigation}
        producto={productoSeleccionado}
      />
    );
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
      <Pantallas />
    </AuthProvider>
  );
}