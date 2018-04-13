import { combineReducers } from 'redux';
import letterReducer from './letterReducer';

export default combineReducers({
  letter: letterReducer
});
