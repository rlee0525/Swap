declare var Promise;
import * as firebase from 'firebase';
import { values } from 'lodash';

import * as ChatAPI from './utils';

export const CHAT = {
  CHECK_RECEIPT: "chat/CHECK_RECEIPT",
  RECEIVE_CONVERSATIONS: 'chat/RECEIVE_CONVERSATIONS'
}

export const receiveReceipt = receipt => ({
  type: CHAT.CHECK_RECEIPT,
  receipt
});

export const receiveConversations = payload => ({
  type: CHAT.RECEIVE_CONVERSATIONS,
  payload
});

export const fetchFirebaseConversations = user => dispatch => (
  ChatAPI.fetchFirebaseConversations(user).then(
    (conversationObj : any) => {
      let dataNeeded = [];
      let conversationIds = Object.keys(conversationObj);
      let firebaseDB = firebase.database();

      conversationIds.forEach(id => {
        let data = firebaseDB.ref(`conversations/${id}`).once('value', snapshot => {
          conversationObj[id].messages = snapshot.val() || {};
        });

        dataNeeded.push(data);
      });
      
      Promise.all(dataNeeded).then(() => {
        let receipt = false;

        values(conversationObj).forEach((conversation : any) => {
          let { messages } = conversation;
          
          let latestTime = Math.max(... Object.keys(messages).map(time => Number(time)));

          if (messages[latestTime].sender !== user.userFB.id && !messages[latestTime].seen) {
            receipt = true;
            return;
          }
        });
        dispatch(receiveReceipt(receipt));
        dispatch(receiveConversations(conversationObj));
      }); 
      
    }
  )
);