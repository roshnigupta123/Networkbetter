import React, { Component } from 'react'
import Swiper from 'react-native-deck-swiper'
import { Button, TouchableOpacity, Text, View, ImageBackground, StatusBar, Image, Linking, ScrollView, TextInput } from 'react-native'
import styles from "./Styles";
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import SearchableDropdown from 'react-native-searchable-dropdown';
import call from 'react-native-phone-call';

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
        cards: [],
        swipedAllCards: false,
        swipeDirection: '',
        cardIndex: 0,
        defaultAnimationDialog: false,
        defaultAnimationDialog2: false,
        textInput_Holder: '',
        ColorHolder: '',
        selectedItems:[],
        diffInDays:'',
        category:'',
        myCardIndex:'',
        number:[],
        recordID:''
      }
  }

  addCategory() {
    this.setState({ defaultAnimationDialog: false, defaultAnimationDialog2: true })
  }

  onPress_plus(category,index,recordID) {
    console.log('category=>',category,'index=>',index,'recordID',recordID)
    this.setState({ defaultAnimationDialog: true,
      category:category, myCardIndex:index,recordID:recordID })
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

  callLogs_fun(phoneNumbers,displayName){

    console.log('phoneNumbers',phoneNumbers,'displayName',displayName)

    let number = phoneNumbers &&
    phoneNumbers.length > 0 &&
    phoneNumbers.map (
      (numberData, numberIndex) => {
        return ( numberData.number )
        }
    )

    console.log('numbernumber',number)

      var i = 0
      var str =  number;
      var strLength = str.length;
      for(i; i < strLength; i++) {
       str = str.toString().replace("-", " ").split(",")
       str = str.toString().replace(/\s+/g,"").split(",")
      }
      let uni = str 
      let u;
      if(uni != false){
         u = uni.filter((v, i, a) => a.indexOf(v) === i)
     this.setState({  number: u, value:u[0] });
      console.log('unique',u);
      this.setState({number:u})
      u.map((item,index)=>{
        return console.log('item',item)
      })
    }else{
        console.log('empty number array')
      }

  }

  getParsedDate(strDate){
    console.log('strDate',strDate)
    this.setState({dateTime:strDate})
    var strSplitDate = String(strDate).split(' ');
     var newDate = new Date(strSplitDate[0]);
  
    var one_day = 1000 * 60 * 60 * 24 
    var present_date = new Date(newDate); 

    var christmas_day = new Date() 
    var Result = Math.round(christmas_day.getTime() - present_date.getTime()) / (one_day); 
    var Final_Result = Result.toFixed(0)
    console.log('Final_Result',Final_Result)

     if(Final_Result == 0){
       this.setState({date:newDate});
     } else {
      this.setState({diffInDays:Final_Result});
    }
}

  renderCard = (card, index) => {
    return (

      <View style={[styles.card]}>
       <ScrollView contentContainerStyle={{flex:1}}>
          <View style={styles.swipecrdsty}>
            <View>
              <Text style={styles.title}>{card.displayName}</Text>
              {/* <Text style={styles.subtitle}>{this.callLogs_fun(card.phoneNumbers,card.displayName)} Last contact 2 week ago</Text>
              <Text style={styles.title}>{ this.state.diffInDays} days ago</Text> */}
            </View>
            <View>
             {card.category==""?(
              <TouchableOpacity onPress={() => { this.onPress_plus(card.category,index,card.recordID) }} style={styles.plusicon}>
                <Image source={require('../images/plus.png')} style={styles.plus} />
              </TouchableOpacity>
              ): <View style={styles.categorybtn}>
              <Text style={styles.subtitle}>{card.category}</Text>
                </View>}
               
               <Text>category {card.recordID}</Text>
            </View>
          </View>
          {/* {this.callLogs_fun(card.phoneNumbers,card.displayName)} */}

           {this.state.number.length != 0 ? (
                this.state.number.map((item,index)=>{
                  return <Text>{item}</Text>
                })
           ): null }

          {card.phoneNumbers &&
            card.phoneNumbers.length > 0 &&
            card.phoneNumbers.map (
              (numberData, numberIndex) => {
                return <View style={[styles.swipecrdsty, { backgroundColor: '#F9F9F9' }]}>
                      <View>
                        <Text style={styles.title}>{numberData.number.replace(/[-\s]/g,"")}</Text>
                      </View>

                  <View style={styles.row}>
                    <TouchableOpacity onPress={() => this.triggerCall(numberData.number)} >
                      <Image source={require('../images/call.png')} style={[styles.plus, { marginRight: 15 }]} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.initiateWhatsApp(numberData.number)} >
                      <Image source={require('../images/whatsapp.png')} style={[styles.humbrgrmenu]} />
                    </TouchableOpacity>
                    {/* <TouchableOpacity onPress={() =>alert('hii')} >
                       <Image source={require('../images/telegram.png')} style={styles.humbrgrmenu} />
                     </TouchableOpacity> */}
                  </View>
                </View>
              }
            )
          }
      </ScrollView>
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
    this.props.categoryList(this.state.textInput_Holder )
    this.setState({ assign_category: '', textInput_Holder: '' })
    // this.props.CategoryList_reducer.push({ name: this.state.textInput_Holder });
    console.log("arrr item", this.props.contacts.CategoryList_reducer)
  }

  componentDidMount() {
    // console.log('home screen',this.props)
     this.generateRandomContact();
     this.ChangeColorFunction();
    //  this.props.loadContacts();
  }

  UNSAFE_componentWillMount() {
    this.generateRandomContact();
    this.ChangeColorFunction();
  }

  generateRandomContact() {
    let contactList = this.props.contacts.ContactList_reducer.contacts;
    for (var finalArr = [contactList], i = 0; i < contactList.length; i++) {
      finalArr[i] = contactList[Math.floor(Math.random() * contactList.length)]
    }
    this.setState({ cards: finalArr })
    //console.log('finalArr',finalArr[0])
  }

  render() {
    let contactList = this.props.contacts.ContactList_reducer.contacts;
    var finalArr, i ;
    for (finalArr = [contactList], i = 0; i < contactList.length; i++) {
      finalArr[i] = contactList[Math.floor(Math.random() * contactList.length)]
    }
    return (

      <View style={[styles.container, { backgroundColor: this.state.ColorHolder }]}>

        <Swiper
          ref={swiper => {
            this.swiper = swiper
          }}
          onSwipedLeft={() => this.onSwiped('left')}
          disableBottomSwipe
          disableRightSwipe
          disableTopSwipe
          infinite
       //   onTapCard={(index=>this.onPress_plus(this.state.cards[index].category,index))}
          cards={this.props.contacts.ContactList_reducer.contacts}
          cardIndex={this.state.cardIndex}
          //cardVerticalMargin={80}
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
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Contact')}>
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

        </Swiper>
        <View style={styles.blackCard}>
          <Text style={styles.crdtext}>
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
                  let data = this.props.contacts.ContactList_reducer.contacts
                  data[this.state.myCardIndex].category = item.name
                  console.log('cards',data[0])
                  this.props.contacts.ContactList_reducer.contacts = data
                  this.setState({ selectedItems: item,cards:data });
                  this.props.update(item.name)
               // console.log('update', this.props.contacts.ContactList_reducer.contacts)
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
              <View style={[styles.header,{ marginBottom:20}]}>
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

