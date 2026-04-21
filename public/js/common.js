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

  $.post("/api/posts", data, (postData, status, xhr) => {
    textbox.val("");
  });
});
