import React from "react";
import { ScrollView,SafeAreaView,View,Image,TouchableOpacity,StyleSheet,TextInput, Text} from "react-native";

const Login=({navigation})=>{
    return(
        <View contentContainerStyle={styles.container}>
            <View style={styles.logo}>
                <Image   source={require('../assets/LOGO1.png')}/>
            </View>
            <View style={{alignItems:'center'}}>
                <TextInput placeholder="Phone/Email" style={styles.input}></TextInput>
                <TextInput placeholder="Password" style={styles.input}secureTextEntry={true}></TextInput>
            </View>
            <View style={{alignItems:'center'}}>
                <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('Home')}>
                    <Text style={{color:'white', fontSize:18,fontWeight:'bold'}}>Login</Text>
                </TouchableOpacity>
                <Text style={{color:'black', fontSize:14,lineHeight:23, fontWeight:'900'}}>Forgot Password!</Text>
                <View style={{alignItems:'center',width:'80%',height:'auto'}}>
                    <Text style={{margin:20,fontSize:20, fontWeight:700,color:'black'}}>Sign in with</Text>
                    <View style={{flexDirection:'row'}}>
                        <Image style={{marginHorizontal:10}} source={require('../assets/applelogo.png')}/>
                        <Image style={{marginHorizontal:10}} source={require('../assets/facelogo.png')}/>
                        <Image style={{marginHorizontal:10}} source={require('../assets/googlelogo.png')}/>
                    </View>
                </View>
            </View>
            <View style={{alignItems:'center',margin:50}}>
                <Text style={{fontSize:14,fontWeight:500}}>Don't have an account? </Text>
                <Text style={{fontSize:14,fontWeight:500,color:'#0F6DDC',textDecorationLine: 'underline'}}>Sign Up</Text>
            </View>
            <TouchableOpacity style={{height:'auto',flexDirection:'row',paddingEnd:20,marginBottom:40,alignItems:'center',justifyContent:'flex-end'}}>
                <Text style={{fontSize:18,fontWeight:600,color:'#0F6DDC',paddingRight:10}}>Skip & Login as Guest</Text>
                <Image source={require('../assets/next.png')}/>
            </TouchableOpacity>
        </View>
    )
    
};
const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    logo:{
        width:'100%',
        justifyContent:'center',
       alignItems:'center',
        padding:70,
    },
    input:{
        width:'80%',
        borderWidth: 1,
        padding:10,
        margin:10,
        borderRadius:5,

    },
    button:{
        width:'80%',
        backgroundColor:'blue',
        padding:10,
        borderRadius:4,
        alignItems:'center',
        justifyContent:''
    },

})
export default Login;