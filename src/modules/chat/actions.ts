import * as ChatAPI from './utils';
import * as firebase from 'firebase';

export const CHECK_RECEIPT = "CHECK_RECEIPT";

export const receiveReceipt = receipt => ({
  type: CHECK_RECEIPT,
  receipt
});

export const checkConversations = user => dispatch => (
  ChatAPI.checkConversations(user).then(
    res => dispatch(receiveReceipt(res)),
    err => console.log(err)
  )
);