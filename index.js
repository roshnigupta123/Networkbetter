/**
 * @format
 */

import {AppRegistry,LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Provider } from "react-redux";
import {createStore, applyMiddleware} from "redux";
import Root_reducers from "./src/screens/services/reducers/Root_reducers";
import React from "react";
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-community/async-storage';
import {persistReducer} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import persistStore from 'redux-persist/es/persistStore';

LogBox.ignoreAllLogs(true);

const logger=store=>{
  return next=>{
      return action=>{
          const  result=next(action);
       //    console.log('middleware log', result);
          return result;
      }
  }
}

const PersistConfig ={
  key :'root',
  storage: AsyncStorage
}

const persistedReducer = persistReducer(PersistConfig, Root_reducers)

let store = createStore(persistedReducer, applyMiddleware(logger, thunk))
let persistor = persistStore(store)

store.subscribe(()=>{
  // console.log('store updated', store.getState())
  store.getState()
})

const Root = () => (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <App />
      </PersistGate>
    </Provider>
  )

AppRegistry.registerComponent(appName, () => Root);
