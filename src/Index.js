import React from "react";
import * as Main from './Main';
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import Home from './screens/home/Home';

const AppNavigator = createStackNavigator({

  Home: {
    screen: Home,
    navigationOptions: {
      headerShown: false,
    },
  },
  Contact: {
    screen: Main.Contact,
    navigationOptions: {
      headerShown: false,
    },
  }
},
)

const Auth = createSwitchNavigator({
  Splash: { screen: Main.Splash },
  Stack: { screen: AppNavigator }
})

export default createAppContainer(Auth);
