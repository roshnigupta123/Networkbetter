import React, { Component } from 'react'
import Swiper from 'react-native-deck-swiper'
import { Button, TouchableOpacity, Text, View, ImageBackground, StatusBar, Image, TextInput, FlatList } from 'react-native'
import styles from "./Styles";
import {  connect } from "react-redux";
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import SearchableDropdown from 'react-native-searchable-dropdown';

import * as actionCreators from '../../actions/index';

const image = require('../images/Group2.png');

// demo purposes only
function* range(start, end) {
  for (let i = start; i <= end; i++) {
    yield i
  }
}

 class Home extends Component {
  constructor(props) {
    super(props)
    this.array = [],
 
    this.state = {
      cards: [...range(1, 50)],
      swipedAllCards: false,
      swipeDirection: '',
      cardIndex: 0,
      defaultAnimationDialog: false,
      arrayHolder: [],
      textInput_Holder: ''
    }
  }

  addCategory(){
    this.setState({defaultAnimationDialog:true})
  }

  renderCard = (card, index) => {
    return (

      <View style={styles.card}>
        {/* <Text style={styles.text}>{card} - {index}</Text> */}
        <View style={styles.swipecrdsty}>
          <View>
            <Text style={styles.title}>Sherlock Homes</Text>
            <Text style={styles.subtitle}>Last contacted 2 weeks ago</Text>
            </View>

            <View>
            <TouchableOpacity onPress={() =>{this.addCategory()}} style={styles.plusicon}>
                  <Image source={require('../images/plus.png')} style={styles.plus} />
                </TouchableOpacity>
            </View>
        </View>

        <View style={[styles.swipecrdsty,{backgroundColor:'#F9F9F9'}]}> 
        <View>
            <Text style={styles.title}>123467799</Text>
            </View>

            <View style={styles.row}>
            <TouchableOpacity onPress={() =>alert('hii')} >
                  <Image source={require('../images/call.png')} style={[styles.plus,{marginRight:15}]} />
                </TouchableOpacity>
               <TouchableOpacity onPress={() =>alert('hii')} >
                  <Image source={require('../images/whatsapp.png')} style={[styles.humbrgrmenu,{marginRight:15}]} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() =>alert('hii')} >
                  <Image source={require('../images/telegram.png')} style={styles.humbrgrmenu} />
                </TouchableOpacity>
            </View>
        </View>

        <View style={[styles.swipecrdsty,{backgroundColor:'#F9F9F9'}]}> 
        <View>
            <Text style={styles.title}>123467799</Text>
            </View>

            <View style={styles.row}>
               <TouchableOpacity onPress={() =>alert('hii')} >
                  <Image source={require('../images/call.png')} style={[styles.plus,{marginRight:15}]} />
                </TouchableOpacity>
               <TouchableOpacity onPress={() =>alert('hii')} >
                  <Image source={require('../images/whatsapp.png')} style={[styles.humbrgrmenu,{marginRight:15}]} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() =>alert('hii')} >
                  <Image source={require('../images/telegram.png')} style={styles.humbrgrmenu} />
                </TouchableOpacity>
            </View>
        </View>
      </View>
     
    )
  };

  onSwiped = (type) => {
    console.log(`on swiped ${type}`)
  }

  onSwipedAllCards = () => {
    this.setState({
      swipedAllCards: true
    })
  };

  swipeLeft = () => {
    this.swiper.swipeLeft()
  };

  joinData = () => {
    this.array.push({title : this.state.textInput_Holder});
    this.setState({ arrayHolder: [...this.array] })
    console.log("arrr",this.state.arrayHolder)
  }

  componentDidMount() {
    console.log('contact',this.props.Contact())
    console.log('arrayHolder',this.state.arrayHolder)
    this.setState({ arrayHolder: [...this.array] })
  }

  render() {
    return (
     
      <View style={styles.container}>

        <Swiper
          ref={swiper => {
            this.swiper = swiper
          }}
        //  onSwiped={() => this.onSwiped('general')}
          onSwipedLeft={() => this.onSwiped('left')}
          disableBottomSwipe
          disableRightSwipe
          disableTopSwipe
          //onSwipedRight={() => this.onSwiped('right')}
          //onSwipedTop={() => this.onSwiped('top')}
          //onSwipedBottom={() => this.onSwiped('bottom')}
          // onTapCard={this.swipeLeft}
          cards={this.state.cards}
          cardIndex={this.state.cardIndex}
          cardVerticalMargin={80}
          cardStyle={{ height: "65%" }}
          renderCard={this.renderCard}
          onSwipedAll={this.onSwipedAllCards}
          stackSize={3}
          stackSeparation={15}
          overlayLabels={{
            bottom: {
              title: 'BLEAH',
              style: {
                label: {
                  backgroundColor: 'black',
                  borderColor: 'black',
                  color: 'white',
                  borderWidth: 1
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }
              }
            },
            left: {
              // title: 'NOPE',
              // style: {
              //   label: {
              //     backgroundColor: 'black',
              //     borderColor: 'black',
              //     color: 'white',
              //     borderWidth: 1
              //   },
              //   wrapper: {
              //     flexDirection: 'column',
              //     alignItems: 'flex-end',
              //     justifyContent: 'flex-start',
              //     marginTop: 30,
              //     marginLeft: -30
              //   }
              // }
            },
            right: {
              title: 'LIKE',
              style: {
                label: {
                  backgroundColor: 'black',
                  borderColor: 'black',
                  color: 'white',
                  borderWidth: 1
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  marginTop: 30,
                  marginLeft: 30
                }
              }
            },
            top: {
              title: 'SUPER LIKE',
              style: {
                label: {
                  backgroundColor: 'black',
                  borderColor: 'black',
                  color: 'white',
                  borderWidth: 1
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }
              }
            }
          }}
          animateOverlayLabelsOpacity
          animateCardOpacity
          swipeBackCard
        >
          <StatusBar backgroundColor="transparent" translucent barStyle="dark-content" />
          <ImageBackground source={image} style={{ flex: 1 }} >
            <View style={styles.content}>
              <View style={styles.header}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Contact')}>
                  <Image source={require('../images/menu.png')} style={styles.humbrgrmenu} />
                </TouchableOpacity>

                <TouchableOpacity>
                  <Image source={require('../images/filter.png')} style={styles.humbrgrmenu} tintColor="#fff" />
                </TouchableOpacity>
              </View>

              <View style={styles.center}>
                <Text style={styles.NWtxt}>NETWORK <Text style={styles.bettertxt}>BETTER</Text></Text>
              </View>
            </View>
          </ImageBackground>
      
        </Swiper>
        <View style={styles.blackCard}>
          <Text style={styles.crdtext}>
            “we value your privacy, this is an offline application. We dont store anything on our servers“</Text>
            <Button onPress={() =>{this.props.Contact()}} title='Swipe Back' />
        </View>
        <View>
          <Dialog
          onDismiss={() => {
           this.setState({defaultAnimationDialog:false})
          }}
          width={0.9}
          visible={this.state.defaultAnimationDialog}
          rounded
          actionsBordered
          // dialogTitle={
          //   <DialogTitle
          //     title="ASSIGN CATEGORY"
          //     style={{
          //       backgroundColor: '#F7F7F8',
          //     }}
          //     hasTitleBar={false}
          //     align="left"
          //   />
          // }
          >
            <DialogContent style={styles.content}>
             <View style={styles.header}>
                  <Text style={styles.title}>ASSIGN CATEGORY</Text>
           
             <TouchableOpacity onPress={() => {this.setState({defaultAnimationDialog: false})}}>
                  <Image source={require('../images/plus.png')} style={styles.plus} />
                </TouchableOpacity>
                </View>
         <SearchableDropdown
          onTextChange={(text) => console.log(text)}
          // onItemSelect={(item) => alert(JSON.stringify(item))}
          onItemSelect={item => { this.setState({name: item.name})
            console.log(item.name)}}
          containerStyle={{marginTop:20}}
          textInputStyle={styles.textInputStyle}
          itemStyle={{padding: 10}}
          itemTextStyle={{color: '#222'}}
          itemsContainerStyle={styles.itemsContainerStyle}
          items={items}
          placeholder="placeholder"
          resPtValue={false}
          underlineColorAndroid="transparent"
        />
              {/* <TextInput  
                placeholder="Enter Value Here"
                onChangeText={data => this.setState({ textInput_Holder: data })}
                style={styles.textInputStyle}
                underlineColorAndroid='transparent'
              /> */}

              {/* <FlatList
                data={this.state.arrayHolder}
                width='100%'
                extraData={this.state.arrayHolder}
                keyExtractor={(index) => index.toString()}
                ItemSeparatorComponent={this.FlatListItemSeparator}
                renderItem={({ item }) =>
                  <Text style={styles.item} > {item.title} </Text>}
              /> */}
              {/* <TouchableOpacity onPress={this.joinData} activeOpacity={0.7} style={styles.button} >
               <Text style={styles.buttonText}> Add Values To FlatList </Text>
                </TouchableOpacity> */}

              <Button onPress={() => { this.setState({ defaultAnimationDialog: false }) }} title='Back' />
            </DialogContent>
          </Dialog>
        
        </View>
        
      </View>
    
    )
  }
}



const mapStateToProps=(state)=>{
  return state
}

const connectComponent = connect (mapStateToProps, actionCreators);

 export default connectComponent(Home);


 const items = [
  // name key is must. It is to show the text in front
  {id: 1, name: 'angellist'},
  {id: 2, name: 'codepen'},
  {id: 3, name: 'envelope'},
  {id: 4, name: 'etsy'},
  {id: 5, name: 'facebook'},
  {id: 6, name: 'foursquare'},
  {id: 7, name: 'github-alt'},
  {id: 8, name: 'github'},
  {id: 9, name: 'gitlab'},
  {id: 10, name: 'instagram'},
];