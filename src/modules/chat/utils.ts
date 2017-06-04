/* global $ */

export const createConversation = (conversation_id, user_id) => (
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
)