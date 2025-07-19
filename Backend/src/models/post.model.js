import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },

    uploadedURL: {
      type: String,
      required: true,
    },

    caption: { type: String, default: "", },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
