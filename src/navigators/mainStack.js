import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native'
import Preload from '../screens/preload'
import Login from '../screens/login'
import HomeDrawer from './HomeDrawer'

const Stack = createStackNavigator();

export default function mainStack(){

    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name={'Preload'} component={Preload}/>
                <Stack.Screen
                    name={'Login'}
                    options={{
                        headerShown: false
                    }}
                    component={Login}/>
                <Stack.Screen
                    name={'HomeDrawer'}
                    component={HomeDrawer}
                    options={{
                        headerShown:false
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}