import React, {useState,useEffect} from 'react';
import { View,Image,Text } from 'react-native';
import SplashScreen from 'expo-splash-screen';
import backgroundImg from '../../assets/images/background.png';
import logoImg from '../../assets/images/logo.png'
import api from '../../services/api';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
function Splash(){
    const {navigate} = useNavigation();
    const [totalConnections, setTotalConnections ] = useState(-1)
    
    useEffect( ()=>{
        setTimeout(() => {
            navigate("Onboarding")
        }, 2000);
    },[] )

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