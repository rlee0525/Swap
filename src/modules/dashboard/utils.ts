// bookmark utils
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

// my posts utils
export const fetchMyPosts = (access_token: string) : JQueryXHR => (
  $.ajax({
    method: "GET",
    url: "api/posts",
    data: { access_token }
  })
);

export const deleteMyPost = (id: number, access_token: string) : JQueryXHR => (
  $.ajax({
    type: "PATCH",
    url: `api/posts/${id}`,
    data: { access_token, method: "delete" }
  })
);

// rfps utils
export const fetchRfps = (access_token: string) : JQueryXHR => (
  $.ajax({
    method: "GET",
    url: "api/rfps",
    data: { access_token }
  })
);

export const deleteRfps = (id: number, access_token: string) : JQueryXHR => (
  $.ajax({
    type: "PATCH",
    url: `api/rfps/${id}`,
    data: { access_token, method: "delete" }
  })
);