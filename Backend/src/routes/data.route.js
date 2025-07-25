import express from "express";
import { profile, newPost, allPosts, searchUser, updateProfile } from "../controllers/data.controller.js";

const router = express.Router();

router.post("/update", updateProfile);

router.post("/:userName/new", newPost);

router.get("/:userName/posts", allPosts);

router.get("/posts", allPosts);

router.post("/search", searchUser);

router.post("/:userName", profile);

export default router;