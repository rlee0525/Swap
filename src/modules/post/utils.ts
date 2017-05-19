/* global $ */
export const fetchPost = (id: number, accessToken: string) => (
  $.ajax({
    method: 'GET',
    url: `api/posts/${id}`,
    data: { access_token: accessToken }
  })
);

// TODO: One the app is approved, we should allow the users to send messages with the provided template without having to go to that person's FB.
// export const createMessage = (id: number) => (
//   $.ajax({
//     method: 'POST',
//     url: `https://graph.facebook.com/v2.6/me/messages?access_token=<PAGE_ACCESS_TOKEN>`
//   })
// )
//
// "data": [
//     {
//       "category": "Product/service",
//       "name": "Sample Page",
//       "access_token": "{access-token}",
//       "id": "1234567890",
//       "perms": [
//         "ADMINISTER",
//         "EDIT_PROFILE",
//         "CREATE_CONTENT",
//         "MODERATE_CONTENT",
//         "CREATE_ADS",
//         "BASIC_ADMIN"
//       ]
//     },
