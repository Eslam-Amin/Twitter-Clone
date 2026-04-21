$(document).ready(() => {
  $.get("/api/posts", (res) => {
    outputPosts(res, $(".postsContainer"));
  });
});

function outputPosts(posts, container) {
  container.html("");
  if (posts.length === 0)
    container.append(`<span class="noResults">No posts yet</span>`);
  posts.forEach((post) => {
    const postHTML = createPostChild(post);
    container.append(postHTML);
  });
}
