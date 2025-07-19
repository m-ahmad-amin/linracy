import Post from "../models/post.model.js";
import User from "../models/user.model.js";

export const profile = async (req, res) => {
  try {
    const { userName } = req.params;

    if (!userName) {
      return res.status(400).json({ message: "Username not provided" });
    }

    const user = await User.findOne({ userName }).select(
      "fullName posts followers following"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      fullName: user.fullName,
      posts: user.posts,
      follower: user.followers,
      following: user.following,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const newPost = async (req, res) => {
  const { userName } = req.params;
  const { uploadedURL, caption } = req.body;

  try {
    if (!uploadedURL) {
      return res.status(400).json({ message: "No url provided" });
    }

    const newPost = new Post({
      userName,
      uploadedURL,
      caption,
    });

    if (newPost) {
      await newPost.save();

      const user = await User.findOne({ userName }).select("posts");

      const numberOfPosts = user.posts + 1;

      const updatedUser = await User.findOneAndUpdate(
        { userName: userName },
        { $set: { posts: numberOfPosts } },
        { new: true }
      );

      res.status(201).json({
        message: "New post created successfully",
      });
    } else {
      res.status(400).json({ message: "Couldn't create new post" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const allPosts = async (req, res) => {
  const { userName } = req.params;

  try {
    const posts = await Post.find({ userName }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching posts",
    });
  }
};

export const yourFeed = async (req, res) => {
  try {
    
  } catch (error) {
    
  }
}
