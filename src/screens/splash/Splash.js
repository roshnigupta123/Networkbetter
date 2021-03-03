import React, { Component } from 'react';
import { View, Text, ImageBackground, StatusBar, Image, Button, TouchableOpacity,Pressable } from "react-native";
import styles from "./Styles";
import * as Animatable from 'react-native-animatable';

const image = require('../images/Group1.png');

class Splash extends Component {

    constructor(props) {
        super(props)
        this.state = {
            status : false,
            Logs_status: true
    }
   }

    componentDidMount() {
        console.log('spalsh',this.props.contacts.CallLog_reducer.status)
      
        let ContactList = this.props.contacts.ContactList_reducer.contacts
        //console.log('spalsh', ContactList.length)
        if (ContactList.length == 0) {
            this.props.contactPermission();
        }
        //  this.props.permission_calls();
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
                                <Text style={[styles.NWtxt]} adjustsFontSizeToFit numberOfLines={1}>NETWORK {" "}<Text style={styles.bettertxt}>BETTER</Text></Text>
                                <Text style={[styles.wlcmtxt, { marginTop: -5 }]}>We pick, You Connect</Text>
                            </View>

                            <View style={styles.center}>
                                <Animatable.View
                                    animation="bounceIn"
                                    iterationCount='infinite'
                                    >
                                    <Image source={require('../images/arrow.png')} style={styles.arrow} />
                                </Animatable.View>
                              
                                
                              
                              {this.props.contacts.CallLog_reducer.status== true?(
                                <Animatable.View
                                    animation="pulse"
                                    iterationCount='infinite'>
                                    <View style={styles.circle1}>
                                        <Pressable style={styles.circle2}
                                            onPress={() => { 
                                                this.props.navigation.navigate('Home')
                                                console.log('status',this.props.contacts.CallLog_reducer.status)
                                               
                                         }}
                                            android_ripple={{ color: '#F9C801' }}>
                                            <Text style={[styles.hitxt]}>Hit me</Text>
                                        </Pressable>
                                    </View>
                                </Animatable.View>
                              ):
                              <Animatable.View
                              animation="pulse"
                              iterationCount='infinite'>
                              <View style={styles.circle1}>
                                  <Pressable style={styles.circle2}
                                      onPress={() => { 
                                          this.props.permission_calls();
                                   }}
                                      android_ripple={{ color: '#F9C801' }}>
                                      <Text style={[styles.hitxt]}>Hit me</Text>
                                  </Pressable>
                              </View>
                          </Animatable.View>
                            }
                              
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