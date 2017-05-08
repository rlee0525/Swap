import { combineReducers } from 'redux';
import userReducer from 'modules/user/reducer';

const rootReducer = combineReducers({
  user: userReducer
});

export default rootReducer;
