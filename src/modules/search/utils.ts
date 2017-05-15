/* global $ */

export const search = (query: string) => (
  $.ajax({
    method: 'GET',
    url: 'api/search',
    data: { query }
  })
);

export const fetchPosts = () => (
  $.ajax({
    method: 'GET',
    url: 'api/search',
    data: { query: [] }
  })
);
