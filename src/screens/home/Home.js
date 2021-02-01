import React, { Component } from 'react'
import Swiper from 'react-native-deck-swiper'
import { Button, TouchableOpacity, Text, View, ImageBackground, StatusBar, Image } from 'react-native'
import styles from "./Styles";

const image = require('../images/Group2.png');

// demo purposes only
function* range(start, end) {
  for (let i = start; i <= end; i++) {
    yield i
  }
}

export default class Exemple extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cards: [...range(1, 50)],
      swipedAllCards: false,
      swipeDirection: '',
      cardIndex: 0
    }
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
            <TouchableOpacity onPress={() =>alert('hii')} style={styles.plusicon}>
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

            {/* <Button onPress={() => this.swiper.swipeBack()} title='Swipe Back' /> */}


          </ImageBackground>
        </Swiper>
        <View style={styles.blackCard}>
          <Text style={styles.crdtext}>
            “we value your privacy, this is an offline application. We dont store anything on our servers“</Text>
        </View>
      </View>
    )
  }
}

