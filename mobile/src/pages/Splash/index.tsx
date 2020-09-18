import React, {useState,useEffect, useContext} from 'react';
import { View,Image,Text } from 'react-native';
import SplashScreen from 'expo-splash-screen';
import backgroundImg from '../../assets/images/background.png';
import logoImg from '../../assets/images/logo.png'
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import AuthContext from '../../contexts/auth';
function Splash(){
    const {navigate} = useNavigation();
    const {authorization,signed} = useContext(AuthContext);
    
    useEffect(()=>{
        authorization('','',true,false)
        setTimeout(() => {
            navigate("Onboarding")
        }, 2000);
        
    },[])

    return(
        <View style={styles.container}>
            <Image source={backgroundImg} style={styles.backgroundImg}/>
            <View style={styles.items}>
                <Image 
                    source={logoImg} 
                    style={styles.logoImg} 
                    resizeMethod="resize"
                />
                <Text style={styles.title}>Sua plataforma de estudos online.</Text>
            </View>
            
            
        </View>
    )
}
export default Splash;
