import { merge } from 'lodash';
import { CHAT } from "./actions";

let _defaultState = {
  receipt: false,
  conversations: {}
};

const chatReducer = (state = _defaultState, action) => {
  Object.freeze(state);
  console.log(action);
  switch (action.type) {
    case CHAT.CHECK_RECEIPT:
      return merge({}, state, { receipt: action.receipt });
    case CHAT.RECEIVE_CONVERSATIONS:
      return merge({}, state, {
        conversations: action.payload
      });
    default:
      return state;
  }
};

export default chatReducer;