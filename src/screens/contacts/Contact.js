import React, { Component } from 'react';
import { View, Text, FlatList, Image, ImageBackground, TouchableOpacity, ActivityIndicator,StatusBar } from "react-native";
import styles from './Styles';
const image = require('../images/Header.png');

export default class Contact extends Component {

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

  ItemView = ({ item }) => {
    return (
      <View style={styles.content}>
        <View style={{ flexDirection: 'row', justifyContent:'space-between' }}>
          <View>
            <Text style={styles.title}>{item.displayName} {''}</Text>
          </View>
          {item.category!=""?(
          <TouchableOpacity style={styles.categorybtn}>
                <Text style={styles.subtitle}>{item.category}</Text>
          </TouchableOpacity>
          ): <TouchableOpacity style={styles.categorybtn}>
          <Text style={styles.subtitle}>Add</Text>
          </TouchableOpacity>}
        </View>
      </View>
    )
  }

  ListHeader = () => {
    return (
      <View style={styles.header}>
        <Text style={[styles.subtitle,{marginLeft:15}]}>
          {this.props.contacts.ContactList_reducer.contacts.length} contact found
        </Text>
      </View>
    );
  };


  render() {
    if (this.props.contacts.ContactList_reducer.loading) {
      <ActivityIndicator size="large" />
    }
    return (
      <View style={styles.container}>
         <StatusBar backgroundColor="transparent" translucent barStyle="light-content" />
        <ImageBackground source={image} style={{height:70 }}  >
          <View style={styles.content}>
            <View style={styles.header}>
              <TouchableOpacity onPress={()=>this.props.navigation.goBack()} >
                <Image source={require('../images/left-arrow.png')} style={styles.img} tintColor="#fff" />
              </TouchableOpacity>

              <TouchableOpacity >
                <Image source={require('../images/filter.png')} style={styles.img} tintColor="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
        <FlatList
            data={this.props.contacts.ContactList_reducer.contacts}
            ListHeaderComponent={this.ListHeader()}
            ItemSeparatorComponent={this.ItemSeparatorView}
            renderItem={(item) => this.ItemView(item)}
            keyExtractor={(item, index) => index.toString()}
          />
      </View>
    )
  }
}