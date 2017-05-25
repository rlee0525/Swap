export const fetchBookmarks = (access_token: string) : JQueryXHR => (
  $.ajax({
    method: "GET",
    url: "api/bookmarks",
    data: { access_token }
  })
);

export const deleteBookmark = (id: number, access_token: string) : JQueryXHR => (
  $.ajax({
    method: "DELETE",
    url: `api/bookmarks/${id}`,
    data: { access_token }
  })
);