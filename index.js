/**
 * @format
 */

import {AppRegistry,LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Provider } from "react-redux";
import React from "react";
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/screens/services/store/Store';
import Main from './src/Main'

LogBox.ignoreAllLogs(true);

const Root = () => (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <App />
      {/* <Main /> */}
      </PersistGate>
    </Provider>
  )

AppRegistry.registerComponent(appName, () => Root);
