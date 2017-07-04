import { merge, omit } from 'lodash';

import { CHAT } from "./actions";

let _defaultState = {
  conversations: {},
  unreadMessage: false
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
    case CHAT.DELETE_CONVERSATION:
      let newState = merge({}, state);
      delete newState.conversations[action.conversationId];      
      return newState;
    default:
      return state;
  }
};

export default chatReducer;