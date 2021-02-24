import React from "react";
import {Dimensions} from 'react-native';
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import Homecontainer from './src/screens/home/Homecontainer';
import Splashcontainer from './src/screens/splash/Splashcontainer';
import Contactcontainer from './src/screens/contacts/Contactcontainer';
import Sidebarcontainer from "./src/screens/filter/Sidebarcontainer.js";

const AppNavigator = createStackNavigator({
 
    Home: {
      screen: Homecontainer,
      navigationOptions: {
        headerShown: false,
      },
    },
    Contact: {
        screen: Contactcontainer,
        navigationOptions: {
          headerShown: false,
        },
      }
},
)

const dashboardStack = createDrawerNavigator({
  Dashboard: { screen: AppNavigator },

}, {
  contentComponent: Sidebarcontainer,
  drawerWidth: Dimensions.get('window').width - 55,
  drawerPosition: 'right'
},
)

const Auth = createSwitchNavigator({
    Splash: { screen:Splashcontainer },
    Dashboard: { screen: dashboardStack }
})

const AppContainer = createAppContainer(Auth);

const App = () => {
  return <AppContainer />
       
};

export default App;