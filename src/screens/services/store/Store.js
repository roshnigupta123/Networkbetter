import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/Root_reducers';
import thunkMiddleware from 'redux-thunk';
import { logger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer, createTransform } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import omit from 'lodash/omit'

let blacklistTransform = createTransform(
  (inboundState, key) => {
    if (key === 'contacts') {
      return omit(inboundState, ['ContactList_reducer']);
    } else {
      return inboundState;
    }
  }
)

const persistConfig = {
  key: 'observeNow',
  storage: AsyncStorage,
  blacklist: ['filter_reducer'],
 // transforms: [blacklistTransform],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware, logger))
);
const persistor = persistStore(store);
export { store, persistor };


// 


// const persistConfig = {
//     key: 'root',
//     storage,
//    

// }
