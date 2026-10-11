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

function Pantallas() {
  const [fuentesListas] = useFonts({
    MontserratAlternates_400Regular,
    MontserratAlternates_700Bold,
    DynaPuff_400Regular,
  });

  const { cargando } = useAuth();
  const [pantallaActual, setPantallaActual] = useState('Inicio');
  const navigation = {
    navigate: (pantalla) => setPantallaActual(pantalla),
  };

  if (!fuentesListas || cargando) {
    return null;
  }

  if (pantallaActual === 'Catalogo') {
    return <Catalogo navigation={navigation} />;
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

  return <Inicio navigation={navigation} />;
}

export default function App() {
  return (
    <AuthProvider>
      <Pantallas />
    </AuthProvider>
  );
}