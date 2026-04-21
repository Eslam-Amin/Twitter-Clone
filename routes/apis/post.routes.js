const express = require("express");
const app = express();
const router = express.Router();
const User = require("../../models/user.model");
const Post = require("../../models/post.model");

router
  .route("/")
  .get(async (req, res, next) => {
    const posts = await Post.find({}).populate("postedBy");
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

module.exports = router;
