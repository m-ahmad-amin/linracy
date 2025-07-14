import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },

    fullName: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
      minLength: 6,
    },

    userName: {
      type: String,
      required: true,
      unique: true,
    },

    profilePic: {
        type: String,
        default: "https://res.cloudinary.com/dzzrxqiho/image/upload/v1752450746/salvatore-andrea-santacroce-Nc0xNgW3G-k-unsplash_lakkzg.jpg",
    },

    followers: {
        type: Number,
        default: 0,
    },

    following: {
        type: Number,
        default: 0,
    },

    dateOfBirth: {
        type: Date,
    },

    bio: {
        type: String,
        maxlength: 200,
        default: "",
    }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;