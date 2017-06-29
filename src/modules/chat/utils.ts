/* global $ */
import * as firebase from 'firebase';
import { keyBy } from 'lodash';
import { IUser } from 'common/interfaces';

declare var Promise;

export const createConversation = (conversation_id : string, user_id : string) : JQueryPromise<any> => (
  $.ajax({
    method: 'POST',
    url: 'api/conversations',
    data: { 
      conversation: {
        conversation_id, 
        user_id 
      }
    }
  })
);

export const fetchConversations = (access_token : string) : JQueryPromise<any> => (
  $.ajax({
    method: 'GET',
    url: 'api/conversations',
    data: { access_token }
  })
);

export const fetchFirebaseConversations = (user : IUser) : any => {
  fetchConversations(user.auth.accessToken).then(
    conversationArray => keyBy<object>(conversationArray, 'conversation_id')
  ).then(
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
        return conversationObj;
      });
    }
  )
}