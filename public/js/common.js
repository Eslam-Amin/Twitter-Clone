$("#postTextarea").keyup((event) => {
  const textbox = $(event.target);
  const value = textbox.val();

  if (value.length > 0) $("#submitPostButton").prop("disabled", false);
  else $("#submitPostButton").prop("disabled", true);
});

$("#submitPostButton").click((event) => {
  const button = $(event.target);
  const textbox = $("#postTextarea");
  const value = textbox.val();
  const data = {
    content: value
  };

  $.post("/api/posts", data, (res) => {
    const postHTML = createPostChild(res);
    $(".postsContainer").prepend(postHTML);
    textbox.val("");
    button.prop("disabled", true);
  });
});

function createPostChild(postData) {
  return postData.content;
}
