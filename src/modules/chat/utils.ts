/* global $ */

export const createConversation = (conversation_id : string, user_id : string) : JQueryPromise<void> => (
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

export const fetchConversations = (access_token : string) : JQueryPromise<void> => (
  $.ajax({
    method: 'GET',
    url: 'api/conversations',
    data: { access_token }
  })
);