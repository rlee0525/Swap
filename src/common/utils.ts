/* global $ */
declare var Promise;

import { keyBy } from 'lodash';
import * as firebase from 'firebase';

import { IUser } from './interfaces';

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
  return fetchConversations(user.auth.accessToken).then(
    conversationArray => keyBy<object>(conversationArray, 'conversation_id')
  );
}