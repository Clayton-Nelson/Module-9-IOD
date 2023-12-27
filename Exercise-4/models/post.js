const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  _id: { type: Number, trim: true, required: true },
  title: { type: String, required: true },
  authors: [{ name: { type: String, required: true }}],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("post", postSchema);
