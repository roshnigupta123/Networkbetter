import React, { Component } from 'react';
import { View, Text, ImageBackground, StatusBar, Image, Button, TouchableOpacity } from "react-native";
import styles from "./Styles";
import * as Animatable from 'react-native-animatable';

const image = require('../images/Group1.png');

class Splash extends Component {

    componentDidMount() {
        console.log('spalsh')
        let ContactList = this.props.contacts.ContactList_reducer.contacts
        //console.log('spalsh', ContactList.length)
        if (ContactList.length == 0) {
            this.props.contactPermission();
        }
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
                                    style={styles.logo}>
                                    <Image source={require('../images/arrow.png')} style={styles.arrow} />
                                </Animatable.View>
                                <Animatable.View
                                    animation="pulse"

                                    iterationCount='infinite'
                                    style={styles.logo}>
                                    <TouchableOpacity style={styles.circle1} onPress={() => { this.props.navigation.navigate('Home') }} >
                                        <TouchableOpacity style={styles.circle2} onPress={() => { this.props.navigation.navigate('Home') }} >
                                            <Text style={[styles.hitxt]}>Hit me</Text>
                                        </TouchableOpacity>
                                    </TouchableOpacity>
                                </Animatable.View>
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