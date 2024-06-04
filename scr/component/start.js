import React from "react";
import {View,SafeAreaView,Text, StyleSheet,Image,Button,TouchableOpacity} from "react-native";
function Start({navigation}){
return(
    <SafeAreaView style={{flex:1,backgroundColor:'#0F6DDC',}}>
        <View style={{alignItems:'center',color:'#0F6DDC',justifyContent:'center',margin:'auto',flex:1,}}>
            <Image source={require('../assets/LOGO.png')}/>
        </View>
        <View>
            <Text style={{fontSize: 16,fontWeight: 'bold',color:'white',textAlign:'center',width:'500',margin:10,}}>The NextGen short NEWS app</Text>
            
            <TouchableOpacity onPress={()=>navigation.navigate('Login')} style={{backgroundColor:'#FFFFFF',padding:12,marginHorizontal:40,flexDirection:'row',borderRadius:11,justifyContent:'center',marginBottom:40,}} onPress={()=> navigation.navigate('Login') }>
                <Text style={{color:'#0F6DDC',fontSize:28,fontWeight:'bold',paddingLeft:20,}}>Get started</Text>
                <Image style={{margin:8,paddingLeft:20,}} source={require('../assets/Arrow.png')}/>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
)
};
export default Start;