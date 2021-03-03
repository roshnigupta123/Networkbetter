import React, { Component } from 'react'
import Swiper from 'react-native-realistic-deck-swiper'
import SwipeCards from 'react-native-swipe-cards';
import { Pressable,
  Alert, TouchableOpacity, Text, View, ImageBackground, StatusBar, Image, Linking, ScrollView, TextInput, BackHandler,
} from 'react-native'
import styles from "./Styles";
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import SearchableDropdown from 'react-native-searchable-dropdown';
import call from 'react-native-phone-call';
import * as Animatable from 'react-native-animatable';
var _ = require('lodash');

const image = require('../images/Group2.png');

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      defaultAnimationDialog: false,
      defaultAnimationDialog2: false,
      textInput_Holder: '',
      ColorHolder: '',
      selectedItems: [],
      category: '',
      recordID: '',
      myId: ''
    }

  }

  addCategory() {
    this.setState({ defaultAnimationDialog: false, defaultAnimationDialog2: true })
  }

  onPress_plus(category, recordID) {
    console.log('category=>', category, 'recordID', recordID)
    this.setState({
      defaultAnimationDialog: true,
      category: category, recordID: recordID
    })
  }


  triggerCall = (item) => {
    const args = {
      number: item,
      prompt: true,
    };
    // Make a call
    call(args).catch(console.error);
  };

  initiateWhatsApp = (item) => {

    var value = item;
    var mobile = '';
    if (value.charAt(0) == '+' || value.charAt(0) == '0') {
      mobile = value.replace(/[^a-zA-Z0-9+]/g, "").substr(3);
      console.log('mobile', mobile)
    }
    else {
      mobile = value.replace(/[^a-zA-Z0-9]/g, "");
      console.log('mobile', mobile)
    }

    let url =
      'whatsapp://send?text=' +
      '' +
      '&phone=91' +
      mobile;
    Linking.openURL(url)
      .then((data) => {
        console.log('WhatsApp Opened');
      })
      .catch(() => {
        alert('Make sure Whatsapp installed on your device');
      });
  };

  ChangeColorFunction = () => {

    var trans = '0.5';
    var color = 'rgba(';
    for (var i = 0; i < 3; i++) {
      color += Math.floor(Math.random() * 256) + ',';
    }
    color += trans + ')';

    this.setState({
      ColorHolder: color
    })
    console.log('ColorHolder', color)
  }

  removeDublicateNumber = (phoneNumbers) => {
    let number = phoneNumbers &&
      phoneNumbers.length > 0 &&
      phoneNumbers.map(
        (numberData, numberIndex) => {
          return (numberData.number)
        }
      )
    console.log('number: ', number,)

    //  let number = ["070240 91890", "070240 91890", "90986 38200", "07024091890"]

    // if (number != undefined) {
    //   var i = 0
    //   var str = number;
    //   var strLength = str.length;
    //   for (i; i < strLength; i++) {
    //     str = str.toString().replace("-", " ").split(",")
    //     str = str.toString().replace(/\s+/g, "").split(",")
    //   }
    //   let uni = str
    //   if (uni != false) {
    //     let u = uni.filter((v, i, a) => a.indexOf(v) === i)
    //     this.setState({ number: u, value: u[0] });
    //     console.log('unique', u);
    //     this.setState({ number: u })
    //   } else {
    //     console.log('empty number array')
    //   }
    // }

    var result1 =  this.props.contacts.CallLog_reducer.callLogs
    var result2 = phoneNumbers

    let result = result1.filter(o1 => result2.some(o2 => o1.phoneNumber === o2.number));
    console.log('result',result)
  }

 
  //------------------------------------------------------------------
  onSwiped = () => {
    this.ChangeColorFunction();
  }

  getParsedDate(strDate) {
    console.log('strDate', strDate)
    this.setState({ dateTime: strDate })
    var strSplitDate = String(strDate).split(' ');
    console.log('strSplitDate', strSplitDate)
    var newDate = new Date(strSplitDate[0]);
    console.log('newDate', newDate)

    var one_day = 1000 * 60 * 60 * 24
    var present_date = new Date(newDate);

    var christmas_day = new Date()

    var Result = Math.round(christmas_day.getTime() - present_date.getTime()) / (one_day);
    var Final_Result = Result.toFixed(0)
    //  alert(Final_Result)
    // console.log('Final_Result', Final_Result)
    // if (Final_Result == 0) {
    //   this.setState({ date: newDate });
    // } else {
    //   this.setState({ diffInDays: Final_Result });
    // }

    return Final_Result;
  }

  renderCard = (card) => {
      console.log('card list', card.dateTime)
    if (card !== undefined || card != null) {
      return (
        <View style={{ flex: 1 }}>

          <View style={styles.swipecrdsty}>
            <View>
            <Text style={[styles.title,{textTransform:'uppercase',letterSpacing:1}]}
            numberOfLines={1} adjustsFontSizeToFit >{card.displayName}</Text>
            {card.dateTime != undefined ?(
            <Text style={styles.subtitle}  numberOfLines={1} adjustsFontSizeToFit
            >last connected on {card.dateTime}</Text>
            ):<Text style={styles.subtitle}  numberOfLines={1} adjustsFontSizeToFit
            >You never called this person</Text>}
            </View>

            <View>
              {card.category == "" ? (
                <TouchableOpacity onPress={() => { this.onPress_plus(card.category, card.recordID) }} style={styles.plusicon}>
                  <Image source={require('../images/plus.png')} style={styles.plus} tintColor='#A7A7A7' />
                </TouchableOpacity>
              ) : null}

              {card.category == "Friends" ? (
                <TouchableOpacity style={[styles.categorybtn, { backgroundColor: 'rgba(215, 38, 61, 0.12)' }]}
                  onPress={() => { this.onPress_plus(card.category, card.recordID) }}>
                  <Text style={[styles.subtitle, { color: '#D7263D' }]}>{card.category}</Text>
                </TouchableOpacity>
              ) : null}

              {card.category == "Work" ? (
                <TouchableOpacity style={[styles.categorybtn, { backgroundColor: 'rgba(249, 200, 1, 0.12)' }]}
                  onPress={() => { this.onPress_plus(card.category, card.recordID) }}>
                  <Text style={[styles.subtitle, { color: '#F9C801' }]}>{card.category}</Text>
                </TouchableOpacity>
              ) : null}

              {card.category == "Business" ? (
                <TouchableOpacity style={[styles.categorybtn, { backgroundColor: 'rgba(76, 175, 80, 0.12)' }]}
                  onPress={() => { this.onPress_plus(card.category, card.recordID) }}>
                  <Text style={[styles.subtitle, { color: '#4CAF50' }]}>{card.category}</Text>
                </TouchableOpacity>
              ) : null}

              {card.category !== "Business" && card.category !== "Work" && card.category !== "Friends" &&
                card.category !== "" ? (
                  <TouchableOpacity style={[styles.categorybtn, { backgroundColor: 'rgba(83, 108, 188, 0.12)' }]}
                    onPress={() => { this.onPress_plus(card.category, card.recordID) }}>
                    <Text style={[styles.subtitle, { color: '#536CBC' }]}>{card.category}</Text>
                  </TouchableOpacity>
                ) : null}
            </View>
          </View>

          {card.phoneNumbers &&
            card.phoneNumbers.length > 0 &&
            card.phoneNumbers.slice(0, 2).map(
              (numberData, numberIndex) => {
                return <View style={[styles.swipecrdsty, { backgroundColor: '#F9F9F9' }]}>
                  <View>
                    <Text style={styles.title}>{numberData.number.replace(/[-\s]/g, "")}</Text>
                  </View>

                  <View style={styles.row}>
                    <TouchableOpacity onPress={() => this.triggerCall(numberData.number)}>
                      <Image source={require('../images/call.png')} style={[styles.plus, { marginRight: 20 }]} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.initiateWhatsApp(numberData.number)}>
                      <Image source={require('../images/whatsapp.png')} style={[styles.humbrgrmenu]} />
                    </TouchableOpacity>

                  </View>
                </View>
              }
            )
          }
        </View>
      )
    }
  };

  renderCardfilter = (card) => {
    //  console.log('card list', card)
    if (card !== undefined || card != null) {
      return (

        <View style={[styles.cardfilter]}>
          <View style={styles.swipecrdsty}>
            <View>
              <Text style={[styles.title,{textTransform:'uppercase'}]}>{card.displayName}</Text>
            </View>
          
            <View>
              {card.category == "" ? (
                <View
                  //onPress={() => { this.onPress_plus(card.category, card.recordID) }} 
                  style={styles.plusicon}>
                  <Image source={require('../images/plus.png')} style={styles.plus} tintColor="#A7A7A7" />
                </View>
              ) : null}

              {card.category == "Friends" ? (
                <View style={[styles.categorybtn, { backgroundColor: 'rgba(215, 38, 61, 0.12)' }]}
                // onPress={() => this.onPress_plus(card.category, card.recordID)}
                >
                  <Text style={[styles.subtitle, { color: '#D7263D' }]}>{card.category}</Text>
                </View>
              ) : null}

              {card.category == "Work" ? (
                <View style={[styles.categorybtn, { backgroundColor: 'rgba(249, 200, 1, 0.12)' }]}
                //onPress={() => this.onPress_plus(card.category, card.recordID)}
                >
                  <Text style={[styles.subtitle, { color: '#F9C801' }]}>{card.category}</Text>
                </View>
              ) : null}

              {card.category == "Business" ? (
                <View style={[styles.categorybtn, { backgroundColor: 'rgba(76, 175, 80, 0.12)' }]}
                // onPress={() => this.onPress_plus(card.category, card.recordID)}
                >
                  <Text style={[styles.subtitle, { color: '#4CAF50' }]}>{card.category}</Text>
                </View>
              ) : null}

              {card.category !== "Business" && card.category !== "Work" && card.category !== "Friends" &&
                card.category !== "" ? (
                  <View style={[styles.categorybtn, { backgroundColor: 'rgba(83, 108, 188, 0.12)' }]}
                  //onPress={() => this.onPress_plus(card.category, card.recordID)}
                  >
                    <Text style={[styles.subtitle, { color: '#536CBC' }]}>{card.category}</Text>
                  </View>
                ) : null}
            </View>
          </View>

          {card.phoneNumbers &&
            card.phoneNumbers.length > 0 &&
            card.phoneNumbers.slice(0, 2).map(
              (numberData, numberIndex) => {
                return <View style={[styles.swipecrdsty, { backgroundColor: '#F9F9F9' }]}>
                  <View>
                    <Text style={styles.title}>{numberData.number.replace(/[-\s]/g, "")}</Text>
                  </View>

                  <View style={styles.row}>
                    <TouchableOpacity onPress={() => this.triggerCall(numberData.number)} >
                      <Image source={require('../images/call.png')} style={[styles.plus, { marginRight: 20 }]} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.initiateWhatsApp(numberData.number)} >
                      <Image source={require('../images/whatsapp.png')} style={[styles.humbrgrmenu]} />
                    </TouchableOpacity>

                  </View>
                </View>
              }
            )
          }
        </View>

      )
    }
  };

  joinData = () => {
    if (this.state.textInput_Holder != "") {
      this.props.categoryList(this.state.textInput_Holder)
      this.setState({ assign_category: '', textInput_Holder: '' })
      // this.props.CategoryList_reducer.push({ name: this.state.textInput_Holder });
      console.log("arrr item", this.props.contacts.CategoryList_reducer)
    } else {
      alert('Please enter the category')
    }
  }


  UNSAFE_componentWillMount() {
    this.generateRandomContact();
  }

  componentDidMount() {
 //   this.getParsedDate('21-May-2020 4:47:31 pm')
   //  console.log('this.props home', this.props.contacts.CallLog_reducer.callLogs)

    //  let collLogs_array= [
    //   {"dateTime": "Feb 19, 2021 3:58:53 PM", "duration": 2,
    //    "name": "Sonu", "phoneNumber": "+919999999999", "rawType": 2,
    //    "timestamp": "1613730533000", "type": "OUTGOING"}, 
      
    //    {"dateTime": "Feb 11, 2021 4:46:24 PM", "duration": 59, 
    //   "name": "Monu", "phoneNumber": "+918888888888", "rawType": 2, 
    //   "timestamp": "1613042184525", "type": "OUTGOING"}, 
      
    //   ]
      
    // let  contact_array=[
    //   {category: "", displayName: "Sonu", givenName: "Sonu",
    //   phoneNumbers: [+919999999999,+915555555555]},
      
    //   {category: "", displayName: "Monu", givenName: "Monu",
    //   phoneNumbers: [+918888888888,+914444444444]},

    //   {category: "", displayName: "Tinky", givenName: "Tinky",
    //   phoneNumbers: [+918888888890,+914444444444]}
    //   ]

    //  var merged = _.map(contact_array, function(item) {
    //   return _.assign(item, _.find(collLogs_array, ['name', item.displayName]));
    // });
    // console.log('merged',merged)
  }

  generateRandomContact() {
    let collLogs = this.props.contacts.CallLog_reducer.callLogs
    let contactList = this.props.contacts.ContactList_reducer.contacts;

    var merged = _.map(contactList, function(item) {
      return _.assign(item, _.find(collLogs, ['name', item.displayName]));
    });

    let RandomContactArray = []
    while (merged.length !== 0) {
      let randomIndex = Math.floor(Math.random() * merged.length);
      RandomContactArray.push(merged[randomIndex]);
      merged.splice(randomIndex, 1)
    }
    console.log('contactList', contactList.length)

    this.props.randomContact(RandomContactArray)
  }

  render() {
    return (
      <View style={styles.container}>

        <StatusBar backgroundColor="transparent" translucent barStyle="dark-content" />
        <ImageBackground source={image} style={{ flex: 1 }}  >
          <View style={{ flex: 1, backgroundColor: this.state.ColorHolder }}>
            <View style={styles.content}>
              <View style={styles.header}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Contact')} >
                  <Image source={require('../images/menu.png')} style={styles.humbrgrmenu} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                  <Image source={require('../images/filter_icon.png')}  tintColor="#fff" />
                </TouchableOpacity>
              </View>

              <View style={styles.center}>
                <Text style={styles.NWtxt}>NETWORK <Text style={styles.bettertxt}>BETTER</Text></Text>
              </View>
            </View>

            {this.props.contacts.filter_reducer.contacts.length == 0 ?
           this.props.contacts.ContactList_reducer.contacts.length != 0 ? ( 
                <Swiper 
                ref={swiper => {
                  this.swiper = swiper
                }}
                  cardsData={this.props.contacts.ContactList_reducer.contacts}
                  renderCard={this.renderCard}
                  onSwiped={this.onSwiped}
                  deckSize={3}
                  infiniteSwipe={true}
                  startIndex={0}
                  containerStyle={{
                    flex: 1,
                    margin: 20
                  }}
                  style={styles.card}
                  onSwipeStart={()=>console.log('kk')}
                />
               ) :
                (
                  <View style={[styles.center, { flex: 1 }]}>
                    <Text style={styles.subtitle}>No data to display</Text>
                  </View>
                ) :
               <SwipeCards
                cards={this.props.contacts.filter_reducer.contacts}
                loop={true}
                renderCard={this.renderCardfilter}
                showYup={false}
                showNope={false}
                onClickHandler={() => console.log('hii')}
              />
            } 
          </View>
        </ImageBackground>
        <View style={styles.center}>
        <View style={styles.blackCard}>
          <Text style={styles.crdtext}>
            “We value your privacy, this is an offline application. We don't store anything on our servers“
            </Text>
          </View>
        </View>
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
                <TouchableOpacity onPress={() => {
                  this.setState({ defaultAnimationDialog: false, selectedItems: [] })
                }}>
                  <Image source={require('../images/cancel.png')} style={styles.plus} />
                </TouchableOpacity>
              </View>
              <SearchableDropdown
                onTextChange={(text) => console.log(text)}
                onItemSelect={item => {
                  this.setState({ selectedItems: item })
                  // this.props.update(item.name, this.state.recordID)
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
                <View style={styles.row}>
                  <Image source={require('../images/plus.png')} tintColor="#fff" style={[styles.plus, { marginTop: 2 }]} />
                  <Text style={styles.buttonText}>  Create a new category</Text>
                </View>
              </TouchableOpacity>

              <View style={styles.center}>
                {this.state.selectedItems.length != 0 ? (
                  <TouchableOpacity onPress={() => {
                    this.setState({ defaultAnimationDialog: false, selectedItems: [] })
                    this.props.update(this.state.selectedItems.name, this.state.recordID)
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

export default Home;

