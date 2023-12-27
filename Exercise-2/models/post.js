const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  userID: { type: Number, trim: true, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, trim: true },
  likes: [{ type: Number }],
  comments: [],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("post", postSchema);
