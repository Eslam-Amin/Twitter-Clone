const express = require("express");
const app = express();
const router = express.Router();
const User = require("../../models/user.model");
const Post = require("../../models/post.model");

router
  .route("/")
  .get(async (req, res, next) => {
    const posts = await Post.find({})
      .populate("postedBy")
      .sort({ createdAt: -1 });
    const payload = {
      pageTitle: "Post"
    };
    res.status(200).send(posts);
  })
  .post(async (req, res, next) => {
    const { content } = req.body;
    if (!content) return res.sendStatus(400);
    const postData = {
      content,
      postedBy: req.session.user
    };
    let post = await (await Post.create(postData)).populate("postedBy");
    // post = await User.populate(post, { path: "postedBy" });
    return res.status(201).send(post);
  });

router.route("/:id/like").put(async (req, res, next) => {
  const { id: postId } = req.params;
  const user = req.session.user;
  const isLiked = user.likes.length && user.likes.includes(postId);
  const option = isLiked ? "$pull" : "$addToSet";
  req.session.user = await User.findByIdAndUpdate(
    user._id,
    { [option]: { likes: postId } },
    { new: true }
  );
  const post = await Post.findByIdAndUpdate(postId, {
    [option]: { likes: user._id }
  });

  return res.status(200).send(post);
});

module.exports = router;
