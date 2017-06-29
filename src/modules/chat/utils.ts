/* global $ */
import * as firebase from 'firebase';

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

export const checkConversations = (user: any) : JQueryPromise<any> => (
  $.ajax({
    method: 'GET',
    url: `api/users/${user.auth.accessToken}`
  }).then(
    res => {
      let conversations = res.conversations;
      let ids = [];

      for (var i = 0; i < conversations.length; i++) {
        var element = conversations[i].conversation_id;
        ids.push(element)
      }

      if (ids.length === 0) {      
        return false;
      } else {
        this.ref = firebase.database().ref(`conversations/${ids[0]}`);
        
        let dataNeeded = [];
        
        for (let i = 0; i < ids.length; i++) {
          let data = firebase.database().ref(`conversations/${ids[i]}`).once('value', snapshot => {
            let messages = snapshot.val() || {};              
            let timestamps = Object.keys(messages);

            if (timestamps.length === 0) {
              return false;
            }

            let lastMessage = messages[timestamps[timestamps.length - 1]];

            if (lastMessage.sender !== user.userFB.id && !lastMessage.seen) {
              return true;
            }

            return false;       
          });

          dataNeeded.push(data);
        }

        Promise.all(dataNeeded).then(res => {
          console.log(JSON.stringify(res));
          return res;
        });
        return res;
      }
    },
    err => console.log(err)
  )
);