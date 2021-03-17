import React, { Component } from 'react';
import { View, Text, FlatList, Image, ImageBackground, TouchableOpacity, ActivityIndicator, StatusBar, TextInput } from "react-native";
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import SearchableDropdown from 'react-native-searchable-dropdown';
import styles from './Styles';
import { SearchBar } from 'react-native-elements';

var _ = require('lodash');
const image = require('../images/Header.png');

export default class Contact extends Component {
  constructor(props) {
    super(props)
    this.array = []
    this.state = {
      defaultAnimationDialog: false,
      defaultAnimationDialog2: false,
      index: '',
      selectedItems: [],
      sortContact: [],
      textInput_Holder: '',
      search: ''
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

  addButton(recordID) {
    this.setState({ defaultAnimationDialog: true, index: recordID })
  }

  addCategory() {
    this.setState({ defaultAnimationDialog: false, defaultAnimationDialog2: true })
  }

  joinData = () => {
    if (this.state.textInput_Holder != "") {
      this.props.categoryList(this.state.textInput_Holder)
      this.setState({ assign_category: '', textInput_Holder: '' })
      console.log("arrr item", this.props.contacts.CategoryList_reducer)
    } else {
      alert('Please enter the category')
    }
  }

  assign_category() {
    this.setState({ defaultAnimationDialog: false });
    console.log('selected item', this.state.selectedItems.id)
    this.props.update(this.state.selectedItems.id, this.state.index)
    let data = this.state.sortContact
    let index = data.findIndex(el => el.recordID == this.state.index);
    data[index] = { ...this.state.sortContact[index], category: this.state.selectedItems.id };
    this.setState({ sortContact: data, selectedItems: [] })
  }

  ItemView = ({ item, index }) => {
    return (
      <View style={styles.content}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <Text style={styles.title}>{item.displayName} {''}</Text>
          </View>

          {item.category === "" ? (
            <TouchableOpacity style={styles.categorybtn} onPress={() => this.addButton(item.recordID)}>
              <Text style={[styles.subtitle, { color: '#A7A7A7' }]}>Add</Text>
            </TouchableOpacity>
          ) : null}

          {item.category == "Friends" ? (
            <TouchableOpacity style={[styles.categorybtn, { backgroundColor: 'rgba(215, 38, 61, 0.12)' }]}
              onPress={() => this.addButton(item.recordID)}>
              <Text style={[styles.subtitle, { color: '#D7263D' }]}>{item.category}</Text>
            </TouchableOpacity>
          ) : null}

          {item.category == "Work" ? (
            <TouchableOpacity style={[styles.categorybtn, { backgroundColor: 'rgba(249, 200, 1, 0.12)' }]}
              onPress={() => this.addButton(item.recordID)}>
              <Text style={[styles.subtitle, { color: '#F9C801' }]}>{item.category}</Text>
            </TouchableOpacity>
          ) : null}

          {item.category == "Business" ? (
            <TouchableOpacity style={[styles.categorybtn, { backgroundColor: 'rgba(76, 175, 80, 0.12)' }]}
              onPress={() => this.addButton(item.recordID)}>
              <Text style={[styles.subtitle, { color: '#4CAF50' }]}>{item.category}</Text>
            </TouchableOpacity>
          ) : null}

          {item.category !== "Business" && item.category !== "Work" && item.category !== "Friends" &&
            item.category !== "" ? (
              <TouchableOpacity style={[styles.categorybtn, { backgroundColor: 'rgba(83, 108, 188, 0.12)' }]}
                onPress={() => this.addButton(item.recordID)}>
                <Text style={[styles.subtitle, { color: '#536CBC' }]}>{item.category}</Text>
              </TouchableOpacity>
            ) : null}

        </View>
      </View>
    )
  }

  ListHeader = () => {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <Text style={[styles.subtitle, { marginLeft: 15,color: '#A7A7A7'  }]}>
            {this.state.sortContact.length} contact found
        </Text>
        </View>
        <View style={styles.inputcontainer}>
         <SearchBar
          round
          searchIcon={{size: 24}}
          onChangeText={(text) => this.searchFilterFunction(text)}
          placeholder="Search contact"
          value={this.state.search}
          containerStyle={styles.containerStyle}
          inputContainerStyle = {styles.inputContainerStyle}
          inputStyle={styles.inputStyle}
        />
        </View>
      </View>
    );
  };

  searchFilterFunction = text => {
    this.setState({ search: text })
    const newData = this.array.filter(item => {
      const itemData = item.displayName ? item.displayName.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    this.setState({ sortContact: newData });
  };

  ItemViewfiltered = ({ item, index }) => {
    return (
      <View style={styles.content}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <Text style={styles.title}>{item.displayName} {''}</Text>
          </View>
          {item.category == "" ? (
            <View style={styles.categorybtn} onPress={() => this.addButton(item.recordID)}>
              <Text style={styles.subtitle}>Add</Text>
            </View>
          ) : null}

          {item.category == "Friends" ? (
            <View 
            style={[styles.categorybtn, { backgroundColor: 'rgba(215, 38, 61, 0.12)' }]}>
              <Text style={[styles.subtitle, { color: '#D7263D' }]}>{item.category}</Text>
            </View>
          ) : null}

          {item.category == "Work" ? (
            <View style={[styles.categorybtn, { backgroundColor: 'rgba(249, 200, 1, 0.12)' }]}>
              <Text style={[styles.subtitle, { color: '#F9C801' }]}>{item.category}</Text>
            </View>
          ) : null}

          {item.category == "Business" ? (
            <View style={[styles.categorybtn, { backgroundColor: 'rgba(76, 175, 80, 0.12)' }]}>
              <Text style={[styles.subtitle, { color: '#4CAF50' }]}>{item.category}</Text>
            </View>
          ) : null}

          {item.category !== "Business" && item.category !== "Work" && item.category !== "Friends" &&
            item.category !== "" ? (
              <View style={[styles.categorybtn, { backgroundColor: 'rgba(83, 108, 188, 0.12)' }]}>
                <Text style={[styles.subtitle, { color: '#536CBC' }]}>{item.category}</Text>
              </View>
            ) : null}
        </View>
      </View>
    )
  }

  ListHeaderfiltered = () => {
    return (
      <View style={styles.header}>
        <Text style={[styles.subtitle, { marginLeft: 15 }]}>
          {this.props.contacts.filter_reducer.contacts.length} contact found
        </Text>
      </View>
    );
  };

  Sorting_func() {
    let contacts = this.props.contacts.ContactList_reducer.contacts
    let contactsCopy = [...contacts];
    let sortContact = contactsCopy.sort(
      (a, b) =>
        a.givenName.toLowerCase() > b.givenName.toLowerCase(),
    );
    this.array = sortContact
    this.setState({ sortContact: sortContact })
  }

  componentDidMount() {
    console.log('contact screen', this.props.contacts.ContactList_reducer.contacts.length)
    this.Sorting_func();
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
                <Image source={require('../images/filter_icon.png')} tintColor="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
        {this.props.contacts.filter_reducer.contacts.length == 0 ? (
          <FlatList
            data={this.state.sortContact}
            ListHeaderComponent={this.ListHeader()}
            ItemSeparatorComponent={this.ItemSeparatorView}
            renderItem={(item) => this.ItemView(item)}
            keyExtractor={(item, index) => index.toString()}
          />
        ) :
          <FlatList
            data={this.props.contacts.filter_reducer.contacts}
            ListHeaderComponent={this.ListHeaderfiltered()}
            ItemSeparatorComponent={this.ItemSeparatorView}
            renderItem={(item) => this.ItemViewfiltered(item)}
            keyExtractor={(item, index) => index.toString()}
          />}

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
                <TouchableOpacity onPress={() => { this.setState({ defaultAnimationDialog: false, selectedItems: [] }) }}>
                  <Image source={require('../images/cancel.png')} style={styles.plus} />
                </TouchableOpacity>
              </View>
              <SearchableDropdown
                onTextChange={(text) => console.log(text)}
                onItemSelect={item => {
                  this.setState({ selectedItems: item });
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
                <View style={{ flexDirection: 'row' }}>
                  <Image source={require('../images/plus.png')} tintColor="#fff" style={[styles.plus, { marginTop: 2 }]} />
                  <Text style={styles.buttonText}>  Create a new category</Text>
                </View>
              </TouchableOpacity>

              <View style={styles.center}>
                {this.state.selectedItems.length != 0 ? (
                  <TouchableOpacity onPress={() => {
                    this.assign_category()
                  }} style={styles.assignbutton}>
                    <Text style={styles.buttonText}>Assign</Text>
                  </TouchableOpacity>
                ) : null}
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
                <TouchableOpacity onPress={() => { this.setState({ defaultAnimationDialog2: false, selectedItems: [] }) }}>
                  <Image source={require('../images/cancel.png')} style={styles.plus} />
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