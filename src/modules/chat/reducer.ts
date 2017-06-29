import { merge } from 'lodash';
import { CHAT } from "./actions";

let _defaultState = {
  unreadMessage: false,
  conversations: {}
};

const chatReducer = (state = _defaultState, action) => {
  Object.freeze(state);

  switch (action.type) {
    case CHAT.CHECK_RECEIPT:
      return merge({}, state, { unreadMessage: action.unreadMessage });
    case CHAT.RECEIVE_CONVERSATIONS:
      return merge({}, state, {
        conversations: action.conversations
      });
    default:
      return state;
  }
};

export default chatReducer;