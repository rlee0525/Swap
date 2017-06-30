declare var Promise;
import * as firebase from 'firebase';
import { values } from 'lodash';

import * as ChatAPI from './utils';

export const CHAT = {
  CHECK_RECEIPT: "chat/CHECK_RECEIPT",
  RECEIVE_CONVERSATIONS: 'chat/RECEIVE_CONVERSATIONS'
}

export const receiveReceipt = unreadMessage => ({
  type: CHAT.CHECK_RECEIPT,
  unreadMessage
});

export const receiveConversations = conversations => ({
  type: CHAT.RECEIVE_CONVERSATIONS,
  conversations
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
          conversationObj[id].hasUnreadMessages = false;
        });

        dataNeeded.push(data);
      });
      
      Promise.all(dataNeeded).then(() => {
        let unreadMessage = false;

        Object.keys(conversationObj).forEach((conversationId) => {
          let messages = conversationObj[conversationId].messages;
          let latestTime = Math.max(... Object.keys(messages).map(time => Number(time)));
          
          if (messages[latestTime].sender !== user.userFB.id && !messages[latestTime].seen) {
            unreadMessage = true;
            conversationObj[conversationId].hasUnreadMessages = true;
          }
        })

        dispatch(receiveReceipt(unreadMessage));
        dispatch(receiveConversations(conversationObj));
      }); 
      
    }
  )
);