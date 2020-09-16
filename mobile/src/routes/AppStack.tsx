import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import Landing from '../pages/Landing';
import GiveClasses from '../pages/GiveClasses';
import StudyTabs from './StudyTabs';
import Splash from '../pages/Splash';
import OnboardingPage from '../pages/OnboardingPage';
import Login from '../pages/Login';
const {Navigator , Screen} = createStackNavigator();

function AppStack (){
    return (        
        <NavigationContainer>
            <Navigator screenOptions={{ headerShown:false}}>
                <Screen name="Login" component={Login} />  
                <Screen name="Onboarding" component={OnboardingPage} />                               
                <Screen name="Splash" component={Splash}/>
                <Screen name="Landing" component={Landing}/>
                <Screen name="GiveClasses" component={GiveClasses}/>
                <Screen name="Study" component={StudyTabs}/>                
            </Navigator>

        </NavigationContainer>

    );
}

export default AppStack;