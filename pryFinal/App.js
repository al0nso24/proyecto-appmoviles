import React, { useState } from 'react';
import { useFonts } from 'expo-font';
import { MontserratAlternates_400Regular, MontserratAlternates_700Bold } from '@expo-google-fonts/montserrat-alternates';
import { DynaPuff_400Regular } from '@expo-google-fonts/dynapuff';
import Inicio from './pantallas/Inicio';
import Catalogo from './pantallas/Catalogo';

export default function App() {
  const [fuentesListas] = useFonts({
    MontserratAlternates_400Regular,
    MontserratAlternates_700Bold,
    DynaPuff_400Regular,
  });

  const[pantallaActual, setPantallaActual] = useState('Inicio');

  const navigation = {
    navigate: (pantalla) => setPantallaActual(pantalla),
  };

  if (!fuentesListas) {
    return null; 
  }

  if(pantallaActual === 'Catalogo') {
    return <Catalogo navigation={navigation} />;
  }

  return <Inicio navigation={navigation} />;
}