import React from 'react';
import { View, Text ,Button,Image} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import News from '../../component/news';

const Tab = createBottomTabNavigator();


const TabNavigation=()=> {
    return (
      <Tab.Navigator  screenOptions={{
        headerShown:false, 
        tabBarLabelStyle:{fontSize:16,paddingBottom:5},
        tabBarStyle:{height:70}
        
        }}>
        <Tab.Screen name="Tin tức" component={News} initialParams={{ categoryId: 0 }} options={{
          tabBarIcon:()=>(
            <Image source={require('../../assets/newsIcon.png')} style={{width:30,height:30,resizeMode:'stretch'}}/>
          ),
          tabBarLabel:'Tin tức',
        }}/>
        <Tab.Screen name="Bóng đá" component={News} initialParams={{categoryId:26}} options={{
          tabBarLabel:'Bóng đá',
          tabBarIcon:()=>(
            <Image source={require('../../assets/footballNewsIcon.png')} style={{width:30,height:30,resizeMode:'stretch'}}/>
          )
        }}/>
        <Tab.Screen name="Trending" component={News} initialParams={{ categoryId: 7 }} options={{
          tabBarIcon:()=>(
            <Image source={require('../../assets/healIcon.png')} style={{width:30,height:30,resizeMode:'stretch'}}/>
          ),
          tabBarLabel:'Sức khỏe',
        }}/>
        <Tab.Screen name="Showbiz" component={News} initialParams={{ categoryId: 23 }} options={{
          tabBarLabel:'Showbiz',
          tabBarIcon:()=>(
            <Image source={require('../../assets/showbizIcon.png')} style={{width:30,height:30,resizeMode:'stretch'}}/>
          )
        }}/>
        <Tab.Screen name="Lưu trữ" component={News} initialParams={{ categoryId: 25 }} options={{
          tabBarLabel:'Học đường',
          tabBarIcon:()=>(
            <Image source={require('../../assets/schoolIcon.png')} style={{width:30,height:30,resizeMode:'stretch'}}/>
          )
        }}/>
      </Tab.Navigator>
    );
  }

  export default TabNavigation;
