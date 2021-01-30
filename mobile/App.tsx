import { StatusBar } from 'expo-status-bar';
import React from 'react';


import {AppLoading} from 'expo';
import {Archivo_400Regular, Archivo_700Bold, useFonts} from '@expo-google-fonts/archivo';
import {Poppins_400Regular, Poppins_600SemiBold} from '@expo-google-fonts/poppins';
import AppStack from './src/routes/AppStack';
import Splash from './src/pages/Splash';
import SplashScreen from 'expo-splash-screen';
import { AuthProvider } from './src/contexts/auth';
export default function App() {
  let [fontsLoad]= useFonts({
    Archivo_400Regular,
    Archivo_700Bold,
    Poppins_400Regular,
    Poppins_600SemiBold
  })
  if (!fontsLoad){
    return <AppLoading />
  }else{
    return (
      < >
        <AuthProvider>
          < AppStack />
        </AuthProvider>
        <StatusBar style="dark"/>
      </>
    );
  }
}


