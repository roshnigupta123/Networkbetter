import React, { Component } from 'react';
import { View, Text, FlatList, Image, ImageBackground, TouchableOpacity, ActivityIndicator, StatusBar, TextInput } from "react-native";
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import SearchableDropdown from 'react-native-searchable-dropdown';
import styles from './Styles';

var _ = require('lodash');
const image = require('../images/Header.png');

export default class Contact extends Component {
  constructor(props) {
    super(props)
    this.array = [],
      this.state = {
        defaultAnimationDialog: false,
        defaultAnimationDialog2: false,
        index:'',
        selectedItems:[]
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

  addButton(index) {
    this.setState({ defaultAnimationDialog: true, index:index })
  }

  addCategory() {
    this.setState({ defaultAnimationDialog: false, defaultAnimationDialog2: true })
  }

  joinData = () => {
    this.props.categoryList(this.state.textInput_Holder )
    this.setState({ assign_category: '', textInput_Holder: '' })
    // this.props.CategoryList_reducer.push({ name: this.state.textInput_Holder });
    console.log("arrr item", this.props.contacts.CategoryList_reducer)
  }

  assign_category(){
    this.setState({ defaultAnimationDialog: false });
    console.log('selected item',this.state.selectedItems.id)
    let data = this.props.contacts.ContactList_reducer.mainContact
    data[this.state.index].category = this.state.selectedItems.id
    this.props.contacts.ContactList_reducer.mainContact = data
    this.props.update(this.state.selectedItems.id)
  }

  ItemView = ({ item, index }) => {
    return (
      <View style={styles.content}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <Text style={styles.title}>{item.displayName} {''}</Text>
          </View>
          {item.category != "" ? (
            <TouchableOpacity style={styles.categorybtn}>
              <Text style={styles.subtitle}>{item.category}</Text>
            </TouchableOpacity>
          ) : <TouchableOpacity style={styles.categorybtn} onPress={() => this.addButton(index)}>
              <Text style={styles.subtitle}>Add</Text>
            </TouchableOpacity>}
        </View>
      </View>
    )
  }

  ListHeader = () => {
    return (
      <View style={styles.header}>
        <Text style={[styles.subtitle, { marginLeft: 15 }]}>
          {this.props.contacts.ContactList_reducer.contacts.length} contact found
        </Text>
      </View>
    );
  };

  componentDidMount(){
        console.log('selected category',this.props.contacts.CategoryList_reducer.name)

     let  mainContact = [{id:"1", category:"Friends"}, {id:"2", category:"Friends"},{id:"3", category:"Work"},
     {id:"4", category:"Business"},{id:"5", category:"Family"}]
      var filtered_ids = _.filter(mainContact, function(p){
        return _.includes(["Friends", "Work"], p.category);
    });
    console.log('filtered_ids',filtered_ids)
  }

  render() {
    if (this.props.contacts.ContactList_reducer.loading) {
      <ActivityIndicator size="large" />
    }

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="transparent" translucent barStyle="light-content" />
        <ImageBackground source={image} style={{ height: 70 }}  >
          <View style={styles.content}>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
                <Image source={require('../images/left-arrow.png')} style={styles.img} tintColor="#fff" />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                <Image source={require('../images/filter.png')} style={styles.img} tintColor="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
        <FlatList
          data={this.props.contacts.ContactList_reducer.mainContact}
          ListHeaderComponent={this.ListHeader()}
          ItemSeparatorComponent={this.ItemSeparatorView}
          renderItem={(item) => this.ItemView(item)}
          keyExtractor={(item, index) => index.toString()}
        />

        <View>

          <Dialog
            onDismiss={() => {
              this.setState({ defaultAnimationDialog: false })
            }}
            width={0.9}
            visible={this.state.defaultAnimationDialog}
            rounded
            actionsBordered >
            <DialogContent style={styles.content}>
              <View style={styles.header}>
                <Text style={styles.title}>ASSIGN CATEGORY</Text>
                <TouchableOpacity onPress={() => { this.setState({ defaultAnimationDialog: false }) }}>
                  <Image source={require('../images/cancel.png')} style={styles.img} />
                </TouchableOpacity>
              </View>
              <SearchableDropdown
                onTextChange={(text) => console.log(text)}
                onItemSelect={item => {
                  // let data = this.props.contacts.ContactList_reducer.mainContact
                  // data[this.state.index].category = item.name
                  // this.props.contacts.ContactList_reducer.mainContact = data
                  this.setState({ selectedItems: item});
                 // this.props.update(item.name)
                }}
                selectedItems={this.state.selectedItems}
                containerStyle={{ marginTop: 20 }}
                textInputStyle={styles.textInputStyle}
                itemStyle={{ padding: 10 }}
                itemTextStyle={{ color: '#222' }}
                itemsContainerStyle={styles.itemsContainerStyle}
                items={this.props.contacts.CategoryList_reducer.name}
                placeholder="search here"
                resPtValue={false}
                underlineColorAndroid="transparent"
              />

              <TouchableOpacity onPress={() => { this.addCategory() }} style={styles.button}>
                <Text style={styles.buttonText}>Create a new category</Text>
              </TouchableOpacity>

              <View style={styles.center}>
                <TouchableOpacity onPress={() => {
                this.assign_category()
                }} style={styles.assignbutton}>
                  <Text style={styles.buttonText}>Assign</Text>
                </TouchableOpacity>
              </View>
            </DialogContent>
          </Dialog>

          <Dialog
            onDismiss={() => {
              this.setState({ defaultAnimationDialog2: false })
            }}
            width={0.9}
            visible={this.state.defaultAnimationDialog2}
            rounded
            actionsBordered >
            <DialogContent style={styles.content}>
              <View style={[styles.header, { marginBottom: 20 }]}>
                <Text style={styles.title}>ADD CATEGORY</Text>
                <TouchableOpacity onPress={() => { this.setState({ defaultAnimationDialog2: false }) }}>
                  <Image source={require('../images/cancel.png')} style={styles.img} />
                </TouchableOpacity>
              </View>

              <TextInput
                placeholder="Enter Value Here"
                onChangeText={text => this.setState({ textInput_Holder: text })}
                style={styles.textInputStyle}
                underlineColorAndroid='transparent'
                value={this.state.textInput_Holder}
              />

              <View style={styles.center}>
                <TouchableOpacity onPress={() => { this.joinData() }} style={styles.assignbutton}>
                  <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
              </View>

              <Text>{this.state.assign_category}</Text>
            </DialogContent>
          </Dialog>

        </View>
      </View>
    )
  }
}