import React, { Component } from 'react';
import { View, Text, ImageBackground, StatusBar,Image, Button, TouchableOpacity } from "react-native";
import styles from "./Styles";

const image = require('../images/Group1.png');

class Splash extends Component {

   componentDidMount(){
    this.props.contactPermission();
    this.props.permission_calls();
  //  console.log('spalsh', this.props.permission_calls())
   } 

    render() {
        return (
            <View style={styles.container}>
                <StatusBar hidden />
                <ImageBackground source={image} style={styles.imagebg} >
                <View style={styles.content}>
                    <View style={styles.textcontainer}>
                        <View>
                     <Text style={[styles.wlcmtxt]}>Welcome to</Text>
                     <Text style={[styles.NWtxt]}>NETWORK {" "}<Text style={styles.bettertxt}>BETTER</Text></Text>
                     <Text style={[styles.wlcmtxt,{marginTop:-5}]}>We pick, You Connect</Text>
                     </View>
                      
                      <View style={styles.center}>
                          <Image source={require('../images/arrow.png')} style={styles.arrow}  />
                     <TouchableOpacity style={styles.circle1} onPress={()=> {this.props.navigation.navigate('Home')} } >
                     <TouchableOpacity style={styles.circle2} onPress={()=> {this.props.navigation.navigate('Home')} } >
                     <Text style={[styles.hitxt]}>Hit me</Text>
                     </TouchableOpacity>
                     </TouchableOpacity>
                     <Text style={[styles.suggestion]}>for a suggestion</Text>
                     </View>
                     </View>
                     
                </View>

                </ImageBackground>
            </View>
        )
    }
}

export default Splash;