import {
    createDrawerNavigator,
  } from '@react-navigation/drawer';

import News from '../../component/news';
import TabNavigation from './TabNavigation';
  const Drawer = createDrawerNavigator();
  
  function DrawerNavigator() {
    return (
      <Drawer.Navigator screenOptions={{headerShown: false, swipeEnabled: false}}>
        <Drawer.Screen name="HomeTabs" component={TabNavigation} /> {/* Use TabNavigation */}
        <Drawer.Screen name="Article" component={News} />
        
      </Drawer.Navigator>
    );
  }
  
  export default DrawerNavigator;
