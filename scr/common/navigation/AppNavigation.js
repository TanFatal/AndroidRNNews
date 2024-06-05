import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigation from './TabNavigation';
import Start from '../../component/start';
import Login from '../../component/login';
import DrawerNavigator from './Drawer';
import NewsDetail from '../../component/newsDetail';
const Stack =createNativeStackNavigator();

export default RootComponent = function(){
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home' screenOptions={{headerShown:false}}>
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Home" component={TabNavigation}/>
        <Stack.Screen name="HomeDrawer" component={DrawerNavigator}/>
        <Stack.Screen name="NewsDetail" component={NewsDetail}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
