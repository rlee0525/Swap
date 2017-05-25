export const fetchBookmarks = access_token => (
  $.ajax({
    method: "GET",
    url: "api/bookmarks",
    data: { access_token }
  })
);