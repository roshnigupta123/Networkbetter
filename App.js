import React from "react";
import {Dimensions} from 'react-native';
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import Home from './src/screens/home/Home';
import Splash from './src/screens/splash/Splash';
import Contact from './src/screens/contacts/Contact';
import Sidebarmenu from "./src/screens/filter/Sidebarmenu";
import { Provider } from "react-redux";
import reducers from './src/reducers/index';
import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))

let store = createStore(reducers, composedEnhancer);

const AppNavigator = createStackNavigator({
 
    Home: {
      screen: Home,
      navigationOptions: {
        headerShown: false,
      },
    },
    Contact: {
        screen: Contact,
        navigationOptions: {
          headerShown: false,
        },
      }
},
)

const dashboardStack = createDrawerNavigator({
  Dashboard: { screen: AppNavigator },

}, {
  contentComponent: Sidebarmenu,
  drawerWidth: Dimensions.get('window').width - 100,
  drawerPosition: 'right'
},
)

const Auth = createSwitchNavigator({
    Splash: { screen:Splash },
    Dashboard: { screen: dashboardStack }
})

const AppContainer = createAppContainer(Auth);

const App = () => {
  return <Provider store={store}>
           <AppContainer />
       </Provider>
};

export default App;