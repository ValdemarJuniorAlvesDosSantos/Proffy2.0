import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#8257E5',        
        justifyContent: 'center',
        alignItems:'center',
        padding: 40,
    },
    backgroundImg:{
        position:"absolute",
        zIndex:-5,
        height:"100%",
        width:"100%",
        resizeMode:"contain",
    },
    logoImg:{
        width:160,
        height:46.75,
        resizeMode:"stretch",
    },
    items:{
        width:160,
    },
    title:{
        fontFamily:'Poppins_400Regular',
        color: '#D4C2FF'
    },
})

export default styles;