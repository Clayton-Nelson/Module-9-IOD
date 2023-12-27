"use strict";
let Models = require("../models"); // matches index.js

const getPosts = (res) => {
  Models.Post.find({})
    .then((data) => res.send({ result: 200, data: data }))
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const createPost = (data, res) => {
  console.log(data);
  new Models.Post(data)
    .save()
    .then((data) => res.send({ result: 200, data: data }))
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const updatePost = (req, res) => {
  console.log(req.body);
  Models.Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
    .then((data) => res.send({ result: 200, data: data }))
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};
const deletePost = (req, res) => {
  Models.Post.findByIdAndDelete(req.params.id)
    .then((data) => res.send({ result: 200, data: data }))
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};
const like = (req, res) => {
  const user = req.body.user;
  Models.Post.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: user } },
    { new: true }
  )
    .then((data) => res.status(200).json({ result: 200, data: data }))
    .catch((err) => {
      console.error(err);
      res.status(500).json({ result: 500, error: err.message });
    });
};
const unlike = (req, res) => {
  const user = req.body.user;
  Models.Post.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: user } },
    { new: true }
  )
    .then((data) => res.status(200).json({ result: 200, data: data }))
    .catch((err) => {
      console.error(err);
      res.status(500).json({ result: 500, error: err.message });
    });
};
const addComment = (req, res) => {
  const postId = req.params.id;
  const newComment = {
    userID: req.body.userId,
    text: req.body.text,
    createdAt: new Date(),
  };

  Models.Post.findByIdAndUpdate(
    postId,
    { $push: { comments: newComment } },
    { new: true }
  )
    .then((data) => res.status(200).json({ result: 200, data: data }))
    .catch((err) => {
      console.error(err);
      res.status(500).json({ result: 500, error: err.message });
    });
};

module.exports = {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  like,
  unlike,
  addComment,
};
