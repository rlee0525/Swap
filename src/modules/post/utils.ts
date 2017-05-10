/* global $ */

export const fetchPost = (id: number) => (
  $.ajax({
    method: 'GET',
    url: `api/posts/${id}`,
  })
);
