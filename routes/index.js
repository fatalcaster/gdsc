const express = require("express");
const router = express.Router();
const path = require("path");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const multer = require("multer");
const uploadImage = require("../utils/imgHandler");
const Post = require("../models/post");
const passport = require("passport");
const postContentValidator = require("../middlewares/postContentValidator");
const upload = multer({
  dest: "./../uploads/",
  limits: { fieldSize: 10 * 1024 * 1024 },
});

router.get("/", async (req, res) => {
  const posts = await Post.find({}).sort({ _id: -1 });
  if (req.isAuthenticated()) {
    res.render(path.join(__dirname, "..", "views", "index-auth.ejs"), {
      posts: posts,
    });
  } else {
    res.render(path.join(__dirname, "..", "views", "index.ejs"), {
      posts: posts,
    });
  }
});

router.get("/create", notAuthenticated, async (req, res) => {
  res.render(path.join(__dirname, "..", "views", "create.ejs"));
});

router.post(
  "/create",
  urlencodedParser,
  notAuthenticated,
  upload.single("imgLink"),
  async (req, res) => {
    postContentValidator(req, res);
    const { body, title } = req.body;
    const file = req.file;
    const image = await uploadImage(file);

    const post = new Post();
    post.title = title;
    post.body = body;
    post.imgLink = image;
    await post.save();

    res.redirect("/");
  }
);

router.get("/post/:id", async (req, res) => {
  const postId = req.params.id;
  const post = await Post.findById(postId).catch((err) => {
    console.log(err);
    res.status(404).redirect("/");
  });
  const likedPosts = req.cookies.postIds;
  if (likedPosts.includes(postId)) {
    post.likes = post.likes + 1;
  } else {
    post.likes = post.likes > 0 ? post.likes - 1 : 0;
  }
  await post.save();
  res.send();
});

router.get("/login", isAuthenticated, async (req, res) => {
  res.render(path.join(__dirname, "..", "views", "login.ejs"));
});

router.post(
  "/login",
  isAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

function notAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("/login");
}

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
}

module.exports = router;
