import React, { Component } from 'react'
// import Swiper from 'react-native-deck-swiper'
import Swiper from 'react-native-realistic-deck-swiper'
import { Button, TouchableOpacity, Text, View, ImageBackground, StatusBar, Image, Linking, ScrollView, TextInput } from 'react-native'
import styles from "./Styles";
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import SearchableDropdown from 'react-native-searchable-dropdown';
import call from 'react-native-phone-call';

var SQLite = require('react-native-sqlite-storage')
var db = SQLite.openDatabase({name: 'test.db', createFromLocation: '~sqlitedatabase.db'})

const image = require('../images/Group2.png');

function* range(start, end) {
  for (let i = start; i <= end; i++) {
    yield i
  }
}

class Home extends Component {
  constructor(props) {
    super(props)
    this.array = [],
      // setInterval(() => {
      //  this.ChangeColorFunction()
      // }, 1000);
      this.state = {
       
        defaultAnimationDialog: false,
        defaultAnimationDialog2: false,
        textInput_Holder: '',
        ColorHolder: '',
        selectedItems: [],
        category: '',
        recordID: '',
        myId:''
      }

      db.transaction((tx) => {
        tx.executeSql('SELECT * FROM contactList WHERE displayName=?', ['Rakhi Pandaye'], (tx, results) => {
            var len = results.rows.length;
            if(len > 0) {
              var row = results.rows.item(0);
              this.setState({myId: row.recordId});
            }
          });
      });
  }

  addCategory() {
    this.setState({ defaultAnimationDialog: false, defaultAnimationDialog2: true })
  }

  onPress_plus(category, index, recordID) {
    console.log('category=>', category, 'index=>', index, 'recordID', recordID)
    this.setState({
      defaultAnimationDialog: true,
      category: category, myCardIndex: index, recordID: recordID
    })
  }

  onPressAssign() {
    this.setState({ defaultAnimationDialog: false })
    let data = this.props.contacts.ContactList_reducer.contacts
    this.props.update(this.state.selectedItems.name)
    let index = data.findIndex(el => el.recordID === this.state.recordID);
    data[index] = { ...data[index], category: this.state.selectedItems.name };
    this.props.contacts.ContactList_reducer.contacts = data
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
    var ColorCode = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
    this.setState({
      ColorHolder: ColorCode
    })
    //console.log('ColorHolder',ColorCode)
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

 if(number!=undefined){
    var i = 0
    var str = number;
    var strLength = str.length;
    for (i; i < strLength; i++) {
      str = str.toString().replace("-", " ").split(",")
      str = str.toString().replace(/\s+/g, "").split(",")
    }
    let uni = str
    if (uni != false) {
      let u = uni.filter((v, i, a) => a.indexOf(v) === i)
      this.setState({ number: u, value: u[0] });
      console.log('unique', u);
      this.setState({number: u})
    } else {
      console.log('empty number array')
    }
  }
  }

  renderCard = (card, index) => {
    if(card!=null){
    return (

      <View style={{ flex: 1 }}>
        <ScrollView>
          <View style={styles.swipecrdsty}>
            <View>
              <Text style={styles.title}>{card.displayName}</Text>
            </View>
            <View>
              {card.category == "" ? (
                <TouchableOpacity onPress={() => { this.onPress_plus(card.category, index, card.recordID) }} style={styles.plusicon}>
                  <Image source={require('../images/plus.png')} style={styles.plus} />
                </TouchableOpacity>
              ) : <View style={styles.categorybtn}>
                  <Text style={styles.subtitle}>{card.category}</Text>
                </View>}

            </View>
          </View>

          {card.phoneNumbers &&
            card.phoneNumbers.length > 0 &&
            card.phoneNumbers.slice(0,2).map(
              (numberData, numberIndex) => {
                return <View style={[styles.swipecrdsty, { backgroundColor: '#F9F9F9' }]}>
                  <View>
                    <Text style={styles.title}>{numberData.number.replace(/[-\s]/g, "")}</Text>
                  </View>

                  <View style={styles.row}>
                    <TouchableOpacity onPress={() => this.triggerCall(numberData.number)} >
                      <Image source={require('../images/call.png')} style={[styles.plus, { marginRight: 15 }]} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.initiateWhatsApp(numberData.number)} >
                      <Image source={require('../images/whatsapp.png')} style={[styles.humbrgrmenu]} />
                    </TouchableOpacity>
                   
                  </View>
                </View>
              }
            )
          }
        </ScrollView>
      </View>

    )
  }
  };

  

  joinData = () => {
    this.props.categoryList(this.state.textInput_Holder)
    this.setState({ assign_category: '', textInput_Holder: '' })
    // this.props.CategoryList_reducer.push({ name: this.state.textInput_Holder });
    console.log("arrr item", this.props.contacts.CategoryList_reducer)
  }


  UNSAFE_componentWillMount() {
    this.generateRandomContact();
    this.ChangeColorFunction();
  }

  generateRandomContact() {
    let contactList = this.props.contacts.ContactList_reducer.contacts;
    // for (var finalArr = [contactList], i = 0; i < contactList.length; i++) {
    //   finalArr[i] = contactList[Math.floor(Math.random() * contactList.length)]
    // }
   
    
    let RandomContactArray = []
    while (contactList.length !== 0){
      let randomIndex = Math.floor(Math.random()*contactList.length);
      RandomContactArray.push(contactList[randomIndex]);
      contactList.splice(randomIndex,1)
    }
    contactList = RandomContactArray

     console.log('contactList',contactList)

    this.props.randomContact(contactList)
  }

  render() {
    return (

      <View style={styles.container}>
        <StatusBar backgroundColor="transparent" translucent barStyle="dark-content" />
        <ImageBackground source={image} style={{ flex: 1 }}  >
          <View style={styles.content}>
            <View style={styles.header}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Contact')}
              >
                <Image source={require('../images/menu.png')} style={styles.humbrgrmenu} />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                <Image source={require('../images/filter.png')} style={styles.humbrgrmenu} tintColor="#fff" />
              </TouchableOpacity>
            </View>

            <View style={styles.center}>
              <Text style={styles.NWtxt}>NETWORK <Text style={styles.bettertxt}>BETTER</Text></Text>
            </View>
          </View>

          <Swiper
            cardsData={this.props.contacts.ContactList_reducer.contacts}
            renderCard={this.renderCard}
            containerStyle={{
              flex: 1,
              margin: 20
            }}
            style={styles.card}
          />
        </ImageBackground>
        {/* <Swiper
          ref={swiper => {
            this.swiper = swiper
          }}
          onSwipedLeft={() => this.onSwiped('left')}
          disableBottomSwipe
          disableRightSwipe
          disableTopSwipe
          infinite
          cards={this.props.contacts.ContactList_reducer.contacts}
          cardIndex={this.state.cardIndex}
          cardStyle={{ height: "65%" }}
          renderCard={this.renderCard}
          onSwipedAll={this.onSwipedAllCards}
          stackSize={3}
          stackSeparation={15}
          overlayLabels={{
          }}
          animateOverlayLabelsOpacity
          animateCardOpacity
          swipeBackCard
          stackSize={3}
          style={{flex:1}}
        >
          <StatusBar backgroundColor="transparent" translucent barStyle="dark-content" />
          <ImageBackground source={image} style={{ flex: 1 }}  >
            <View style={styles.content}>
              <View style={styles.header}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Contact')}
                 >
                  <Image source={require('../images/menu.png')} style={styles.humbrgrmenu} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                  <Image source={require('../images/filter.png')} style={styles.humbrgrmenu} tintColor="#fff" />
                </TouchableOpacity>
              </View>

              <View style={styles.center}>
                <Text style={styles.NWtxt}>NETWORK <Text style={styles.bettertxt}>BETTER</Text></Text>
              </View>
            </View>
          </ImageBackground>

        </Swiper> */}

        <View style={styles.blackCard}>
          <Text style={styles.crdtext}>{this.state.myId}
            “we value your privacy, this is an offline application. We dont store anything on our servers“</Text>
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
                <TouchableOpacity onPress={() => { this.setState({ defaultAnimationDialog: false }) }}>
                  <Image source={require('../images/cancel.png')} style={styles.plus} />
                </TouchableOpacity>
              </View>
              <SearchableDropdown
                onTextChange={(text) => console.log(text)}
                onItemSelect={item => {
                  this.setState({ selectedItems: item })
                  this.props.update(item.name, this.state.recordID)
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
                  this.setState({ defaultAnimationDialog: false })
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

