/* global $ */
export const search = (data: object) => (
  $.ajax({
    method: 'GET',
    url: 'api/search',
    data
  })
);
