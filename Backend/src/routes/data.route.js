import express from "express";
import { profile, newPost, allPosts, yourFeed } from "../controllers/data.controller.js";

const router = express.Router();

router.post("/:userName", profile);

router.post("/:userName/new", newPost);

router.get("/:userName/posts", allPosts);

router.get("/feed", yourFeed);

export default router;