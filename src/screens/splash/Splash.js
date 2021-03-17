import React, { Component } from 'react';
import { View, Text, ImageBackground, StatusBar, Image, Button, TouchableOpacity, Pressable } from "react-native";
import styles from "./Styles";
import * as Animatable from 'react-native-animatable';
// import Dialog, { DialogContent, DialogFooter, DialogButton } from 'react-native-popup-dialog';
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton,
  SlideAnimation,
  ScaleAnimation,
} from 'react-native-popup-dialog';

const image = require('../images/Group1.png');

class Splash extends Component {

  constructor(props) {
    super(props)
    this.state = {
      status: false,
      Logs_status: true,
      defaultAnimationDialog: false,
    }
  }

  func_permissionContact() {
    let ContactList = this.props.contacts.ContactList_reducer.contacts
    if (ContactList.length == 0) {
      this.setState({ defaultAnimationDialog: true })
      //this.props.contactPermission();
    }
  }

  componentDidMount() {
    this.func_permissionContact()
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
                  iterationCount='infinite' >
                  <Image source={require('../images/arrow.png')} style={styles.arrow} />
                </Animatable.View>

                {this.props.contacts.CallLog_reducer.status == true ? (
                  <Animatable.View
                    animation="pulse"
                    iterationCount='infinite'>
                    <View style={styles.circle1}>
                      <Pressable style={styles.circle2}
                        onPress={() => {
                          this.props.navigation.navigate('Home')
                          console.log('status', this.props.contacts.CallLog_reducer.status)
                        }}
                        android_ripple={{ color: '#F9C801' }}>
                        <Text style={[styles.hitxt]}>Hit me</Text>
                      </Pressable>
                    </View>
                  </Animatable.View>
                ) :
                  <Animatable.View
                    animation="pulse"
                    iterationCount='infinite'>
                    <View style={styles.circle1}>
                      <Pressable style={styles.circle2}
                        onPress={() => { this.props.permission_calls() }}
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

        <Dialog
          onDismiss={() => {
            this.setState({ defaultAnimationDialog: false })
          }}
          width={0.9}
          visible={this.state.defaultAnimationDialog}
          rounded
          actionsBordered
          dialogTitle={
            <DialogTitle
              title="Note"
              style={{
                backgroundColor: '#F7F7F8',
                alignItems: 'center'
              }}
              hasTitleBar={false}
              align="left"
            />
          }
        >
          <DialogContent
            style={{
              backgroundColor: '#F7F7F8',
            }}>
            <Text style={styles.subtitle}>
              Network better will be asking for permission to make call and to access the users contact list.
              This allows you to view , categorise and make calls from the application to your friends and family.
                                   {'\n'}{'\n'}
                                     Network Better App provide call Log functionality because it helps you keep track of your last
                                      call data.
                                </Text>

            <View style={styles.btncenter}>
              <TouchableOpacity style={styles.btn} onPress={() => {
                this.setState({ defaultAnimationDialog: false })
                this.props.contactPermission();
              }}>
                <Text style={styles.btntxt}>Ok</Text>
              </TouchableOpacity>
            </View>
          </DialogContent>
        </Dialog>
      </View>
    )
  }
}



export default Splash;