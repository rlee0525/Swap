/* global $ */

export const fetchPosts = () => (
  $.ajax({
    method: 'GET',
    url: 'api/posts'
  })
);
