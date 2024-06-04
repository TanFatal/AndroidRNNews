import React from 'react';
import { View, Text ,Button,Image} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import News from '../../component/news';

const Tab = createBottomTabNavigator();


const TabNavigation=()=> {
    return (
      <Tab.Navigator screenOptions={{headerShown:false}}>
        <Tab.Screen name="News" component={News} options={{
          tabBarIcon:()=>(
            <Image source={require('../../assets/newsIcon.png')} style={{width:30,height:30,resizeMode:'stretch'}}/>
          )
        }}/>
        <Tab.Screen name="Media" component={News} options={{
          tabBarIcon:()=>(
            <Image source={require('../../assets/mediaIcon.png')} style={{width:30,height:30,resizeMode:'stretch'}}/>
          )
        }}/>
        <Tab.Screen name="Trending" component={News} options={{
          tabBarIcon:()=>(
            <Image source={require('../../assets/trendingIcon.png')} style={{width:30,height:30,resizeMode:'stretch'}}/>
          )
        }}/>
        <Tab.Screen name="Career" component={News} options={{
          tabBarIcon:()=>(
            <Image source={require('../../assets/careerIcon.png')} style={{width:30,height:30,resizeMode:'stretch'}}/>
          )
        }}/>
        <Tab.Screen name="Tech" component={News} options={{
          tabBarIcon:()=>(
            <Image source={require('../../assets/techIcon.png')} style={{width:30,height:30,resizeMode:'stretch'}}/>
          )
        }}/>
      </Tab.Navigator>
    );
  }

  export default TabNavigation;