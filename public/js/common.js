$("#postTextarea").keyup((event) => {
  const textbox = $(event.target);
  const value = textbox.val();

  if (value.length > 0) $("#submitPostButton").prop("disabled", false);
  else $("#submitPostButton").prop("disabled", true);
});
