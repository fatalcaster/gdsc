const mongoose = require("mongoose");
const getDateFormat = require("../utils/dateTransformer");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    body: {
      type: String,
    },
    imgLink: {
      type: String,
      required: false,
    },
    likes: {
      type: Number,
      required: true,
      default: 0,
    },
    createdAt: {
      type: String,
      required: true,
      default: getDateFormat(),
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
    toObject: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

module.exports = mongoose.model("Post", postSchema);
