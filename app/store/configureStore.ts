import {createStore, applyMiddleware, compose} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import thunk, {ThunkMiddleware} from 'redux-thunk';
import {createLogger} from 'redux-logger';

import rootReducer from '../reducer/index';
import {useDispatch} from 'react-redux';

let config = {
  key: 'root',
  storage: AsyncStorage,
  version: 8,
  whitelist: ['appData'],
  blacklist: [],
  debug: __DEV__,
};

const logger = createLogger({
  collapsed: true,
});

const reducer = persistReducer(config, rootReducer);

function configureStore(initialState?: any) {
  const composeEnhancers = compose;

  const middlewares: ThunkMiddleware[] = [thunk];
  middlewares.push(logger);
  const enhancer = composeEnhancers(applyMiddleware(...middlewares));
  const store = createStore(reducer, initialState, enhancer);
  const persistor = persistStore(store, undefined, () => {});
  return {persistor, store};
}

const store = configureStore().store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default configureStore;
