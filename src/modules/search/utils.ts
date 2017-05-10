/* global $ */

export const search = (query: string) => (
  $.ajax({
    method: 'GET',
    url: 'api/search',
    data: { query: '' }
  })
);