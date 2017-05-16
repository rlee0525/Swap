/* global $ */

export const search = (query: string) => (
  $.ajax({
    method: 'GET',
    url: 'api/search',
    data: { query }
  })
);

export const fetchPosts = (query: string) => (
  $.ajax({
    method: 'GET',
    url: 'api/search',
    data: { query: [] }
  })
);
