import React, { Component } from 'react';
import { View, Text, FlatList,  PermissionsAndroid, Platform, TouchableOpacity } from "react-native";
import Contacts from "react-native-contacts";
import CallLogs from 'react-native-call-log';

export default class Contact extends Component {

  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
    }
    Contacts.iosEnableNotesUsage(false);
  }

  async componentDidMount() {
    if (Platform.OS === "android") {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: "Contacts",
        message: "This app would like to view your contacts."
      }).then(() => {
        this.loadContacts();
      });
    } else {
      this.loadContacts();
    }
  }

  async loadContacts() {
    Contacts.getAll()
      .then(contacts => {
        contacts.sort(
          (a, b) => 
            a.givenName.toLowerCase() > b.givenName.toLowerCase(),
        );
        this.setState({ contacts, loading: false });
        console.log('contacts', this.state.contacts[2])
      })
      .catch(e => {
        this.setState({ loading: false });
      });

    Contacts.checkPermission();

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
      {
        title: 'Call Log Example',
        message: 'Access your call logs',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      CallLogs.loadAll().then((c) => { this.setState({ listData: c }) });
      CallLogs.load(4).then((c) => {
        console.log('CallLogs', c)
      }
      );
    } else {
      alert('Call Log permission denied');
    }

  }

  ItemSeparatorView = () => {
    return (
      // FlatList Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };


  ItemView = ({item}) => {
    return (
      <View style={{ padding: 20 }}>
        <View style={{flexDirection:'row',alignItems:'center'}}>
          {/* <Avatar
            img={
              item.hasThumbnail
                ? { uri: item.thumbnailPath }
                : undefined
            }
            placeholder={getAvatarInitials(
              `${item.givenName} ${item.familyName}`
            )}
            width={40}
            height={40}/> */}

            <View style={{marginLeft:20}}>
          <Text>{item.displayName} {''}</Text>

         
          </View>
       
             <TouchableOpacity onPress={()=>this.props.navigation.navigate('ContactDetails')}>
                 <Text>details</Text>
             </TouchableOpacity>
        </View>
      </View>
    )
  }


  render() {
    return (
      <View>
        <FlatList
          data={this.state.contacts}
          //data defined in constructor
          ItemSeparatorComponent={this.ItemSeparatorView}
          //Item Separator View
          renderItem={(item)=>this.ItemView(item)}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    )
  }
}