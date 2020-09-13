import { useNavigation,StackActions} from '@react-navigation/native';
import React, { useState } from 'react';
import { View } from 'react-native';
import Onboarding from '../../components/Onboarding';

function OnboardingPage(){
    const [title, setTitle] = useState("Encontre vários professores para ensinar você.");
    const [pageNumber, setPageNumber] = useState(1);
    const {navigate,} = useNavigation();
      
    function handleJumpPage(){

        if (pageNumber === 2){
            StackActions.popToTop()
            navigate('Landing')
            
            return
        }
        setTitle("Ou dê aulas sobre o que você mais conhece.");
        setPageNumber(2);


    }
    return (
        <View>
            <Onboarding title={title} number={pageNumber} onPressButton={handleJumpPage} />
        </View>
    )
}

export default OnboardingPage;