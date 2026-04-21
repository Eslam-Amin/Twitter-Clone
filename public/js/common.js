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
  const postedBy = postData.postedBy;
  const displayName = `${postedBy.firstName} ${postedBy.lastName}`;
  const timestamp = postData.createdAt;
  console.log("🚀 ~ createPostChild ~ postedBy:", postedBy);

  return `
  <div class="post">
    <div class="mainContentContainer">
      <div class="userImageContainer">
        <img src="${postedBy.profilePicture}" alt="User's Profile Picture">
      </div>
      <div class="postContentContainer">
        <div class="postHeader">
          <a href="/profile/${postedBy.username}">${displayName}</a>
          <span class="username">${postedBy.username}</span>
          <span class="date">${timestamp}</span>
      </div>
        <div class="postBody">
          <span>${postData.content}</span>
      </div>
      <div class="postFooter">
      </div>
      </*div>
    </div>

  </>
  `;
}
