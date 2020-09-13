import React, {useState,useEffect} from 'react';
import { View,Image,Text } from 'react-native';
import SplashScreen from 'expo-splash-screen';
import backgroundImg from '../../assets/images/background.png';
import logoImg from '../../assets/images/logo.png'
import api from '../../services/api';
import { useNavigation } from '@react-navigation/native'
function Splash(){
    const {navigate} = useNavigation();
    const [totalConnections, setTotalConnections ] = useState(-1)
    
    if (totalConnections !==-1){
        navigate("Landing")
    }else{
        api.get('connections').then(response => {
                const { total } = response.data;
                setTotalConnections(total);
        })
    }
    return(
        <View style={styles.container}>
            <Image source={backgroundImg} style={styles.backgroundImg}/>
            <View style={styles.items}>
                <Image 
                    source={logoImg} 
                    style={styles.logoImg} 
                    resizeMethod="resize"
                />
                <Text style={styles.title}>Sua plataforma de estudos onlines.</Text>
            </View>
            
            
        </View>
    )
}
export default Splash;

import styles from './styles';