import * as ChatAPI from './utils';
import * as firebase from 'firebase';

export const CHAT = {
  CHECK_RECEIPT: "chat/CHECK_RECEIPT",
  RECEIVE_CONVERSATIONS: 'chat/RECEIVE_CONVERSATIONS'
}

export const receiveReceipt = receipt => ({
  type: CHAT.CHECK_RECEIPT,
  receipt
});

export const checkConversations = user => dispatch => (
  ChatAPI.checkConversations(user).then(
    res => dispatch(receiveReceipt(res)),
    err => console.log(err)
  )
);
