import * as ChatAPI from './utils';
import * as firebase from 'firebase';
declare var Promise;

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
        
        dispatch(receiveConversations(conversationObj));
      }); 
      
    }
  )
);