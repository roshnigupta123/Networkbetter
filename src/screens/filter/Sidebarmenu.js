import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import styles from "./Styles";

export default class Sidebarmenu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activebox: false,
      data: []
    }
  }
  
  componentDidMount() {
    console.log('sidebar', this.props.category.CategoryList_reducer.name)
  }
  

  box(index, status) {
    console.log('index', index)
    this.setState({ activebox: true });
    let data = this.props.category.CategoryList_reducer.name
    data[index].status = true
    this.setState({ data })
    console.log('data', data)
  }

  uncheckbox(index, status) {
    console.log('index', index)
    this.setState({ activebox: true });
    let data = this.props.category.CategoryList_reducer.name
    data[index].status = false
    this.setState({ data })
    console.log('data', data)
  }

  ItemView = ({ item, index }) => {
    if (item.status == true) {
      return (
        <TouchableOpacity style={styles.activebox}
          onPress={() => { this.uncheckbox(index, item.status) }}>
          <Text style={styles.boxtext}>{item.name}</Text>
        </TouchableOpacity>
      )
    }

    if (item.status == false) {
      return (
        <TouchableOpacity style={styles.box}
          onPress={() => { this.box(index, item.status) }}>
          <Text style={[styles.boxtext, { color: '#000' }]}>{item.name}</Text>
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
        </View>
      </View>
    )
  }
}