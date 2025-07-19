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

    profilePicture: {
        type: String,
        default: "https://res.cloudinary.com/dzzrxqiho/image/upload/v1752450746/salvatore-andrea-santacroce-Nc0xNgW3G-k-unsplash_lakkzg.jpg",
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
