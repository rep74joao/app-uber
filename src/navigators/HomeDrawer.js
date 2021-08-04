import React from 'react'
import {createDrawerNavigator} from '@react-navigation/drawer'
import Home from '../screens/home'
import CustomDrawer from '../components/CustomDrawer'

const Drawer = createDrawerNavigator();

export default function HomeDrawer(){
    return (
           <Drawer.Navigator drawerContent={props => <CustomDrawer {...props}/>}>
               <Drawer.Screen name={'Home'} component={Home}/>
           </Drawer.Navigator>
    )
}