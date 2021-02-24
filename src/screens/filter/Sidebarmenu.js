import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import styles from "./Styles";
var _ = require('lodash');

export default class Sidebarmenu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activebox: false,
      data: [],
      tempcategory: []
    }
  }

  componentDidMount() {
    console.log('sidebar', this.props.category.ContactList_reducer.filterContact)
  }


  box(index, status) {
    console.log('index', index)
    this.setState({ activebox: true });
    let data = this.props.category.CategoryList_reducer.name
    data[index].status = true
    this.setState({ data })
    console.log('data', data)
    this.filter_contactList();
  }

  filter_contactList() {
    let mainCategory = this.props.category.CategoryList_reducer.name
    var result = mainCategory.filter(obj => {
      return obj.status == true
    })

    console.log('selected category result', result)
    let tempcategory = []
    for (let i = 0; result.length > i; i++) {
      console.log('gfjvbn', result[i].name)
      let cate = result[i].name
      tempcategory.push(cate)
    }
    console.log('cate', tempcategory)
    this.setState({ tempcategory })
  }

  uncheckbox(index, status) {
    console.log('index', index)
    this.setState({ activebox: true });
    let data = this.props.category.CategoryList_reducer.name
    data[index].status = false
    this.setState({ data })
    console.log('data', data)
    this.filter_contactList()
    // this.props.contactListfilter(this.props.category.ContactList_reducer.contacts, this.state.tempcategory)

  }

  onPress_filter() {
    console.log('tempcategory', this.state.tempcategory)
    this.props.contactListfilter(this.props.category.ContactList_reducer.contacts, this.state.tempcategory,
      this.props.category.ContactList_reducer.filterContact)
  }

  clear_filter() {
    let tempcategory = []
    let data = this.props.category.CategoryList_reducer.name
    let nObj = data.filter(ele => {
      ele.status = false;
      return ele;
    });

    this.props.contactListfilter(this.props.category.ContactList_reducer.contacts, tempcategory,
      this.props.category.ContactList_reducer.filterContact)
    console.log('tempcategory', tempcategory)
  }

  UNSAFE_componentWillMount() {
    this.clear_filter();
  }

  ItemView = ({ item, index }) => {
    if (item.status == true) {
      return (
        <View style={styles.activebox}
        // onPress={() => { this.uncheckbox(index, item.status) }}
        >
          <Text style={styles.boxtext} numberOfLines={1}>{item.name}</Text>
        </View>
      )
    }

    if (item.status == false) {
      return (
        <TouchableOpacity style={styles.box}
          onPress={() => { this.box(index, item.status) }}>
          <Text style={[styles.boxtext, { color: '#A7A7A7' }]} numberOfLines={1}>{item.name}</Text>
        </TouchableOpacity>
      )
    }
  }

  render() {
    let data = this.props.category.CategoryList_reducer.name
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.heading}>Filter</Text>
            <TouchableOpacity onPress={() => this.props.navigation.closeDrawer()}>
              <Image source={require('../images/cancel.png')} style={styles.plus} />
            </TouchableOpacity>
          </View>
          <View style={styles.border} />
          <View>
            <Text style={styles.title}>what are you looking for</Text>
            <FlatList
              data={data}
              renderItem={(item) => this.ItemView(item)}
              keyExtractor={(item, index) => index.toString()}
              numColumns={3}
            />
          </View>

          <View style={styles.center}>
            <TouchableOpacity style={styles.filterbtn} onPress={() => this.onPress_filter()} >
              <Text style={styles.buttonText}>Filter</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.filterbtn} onPress={() => this.clear_filter()} >
              <Text style={styles.buttonText}>Clear</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}