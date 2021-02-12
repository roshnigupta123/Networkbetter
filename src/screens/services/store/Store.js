import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/Root_reducers';
import thunkMiddleware from 'redux-thunk';
import { logger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

const persistConfig = {
  key: 'observeNow',
  storage: AsyncStorage,
//    whitelist: ['ContactList_reducer'],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware,logger))
);
const persistor = persistStore(store);
export { store, persistor };