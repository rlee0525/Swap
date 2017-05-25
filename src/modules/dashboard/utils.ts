export const fetchBookmarks = access_token => (
  $.ajax({
    method: "GET",
    url: "api/bookmarks",
    data: { access_token }
  })
);

export const deleteBookmark = (id, access_token) => (
  $.ajax({
    method: "DELETE",
    url: `api/bookmarks/${id}`,
    data: { access_token }
  })
);