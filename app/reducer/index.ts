import {combineReducers} from 'redux';
import * as TabReducer from './TabReducer';

const rootReducer = combineReducers({
  ...TabReducer,
});

export default rootReducer;
