/* global $ */
export const fetchPost = (id: number, accessToken: string) => (
  $.ajax({
    method: 'GET',
    url: `api/posts/${id}`,
    data: { access_token: accessToken }
  })
);