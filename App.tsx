import React from 'react';  //Esse arquivo é a tela inicial do app
import { StatusBar, LogBox } from 'react-native';
import { useFonts } from 'expo-font';
import { Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter'; //fonte
import { Rajdhani_500Medium, Rajdhani_700Bold } from '@expo-google-fonts/rajdhani'; //fonte
import AppLoading from 'expo-app-loading'

LogBox.ignoreLogs(['You are not currently signed in to Expo on your development machine.'])
//LogBox é responsável pelos warnings

import { AuthProvider } from './src/hooks/auth';

import { Routes } from './src/routes';
import { Background } from './src/components/Background';

export default function App() {
  const [fontsLoaded] = useFonts ({
    Inter_400Regular,
    Inter_500Medium,
    Rajdhani_500Medium,
    Rajdhani_700Bold
  });

  if(!fontsLoaded) { //se as fontes não forem carregadas irá ficar na tela inicial
    return <AppLoading/>
  }

  return (
    <Background>
      <StatusBar 
        barStyle = "light-content" //deixa os itens da barra de tarefa em branco
        backgroundColor = "transparent" //deixa transparente porém branco
        translucent //cola no limite da tela
      />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </Background>
  );
}