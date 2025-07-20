import express from "express";
import { profile, newPost, allPosts, searchUser } from "../controllers/data.controller.js";

const router = express.Router();


router.post("/:userName/new", newPost);

router.get("/:userName/posts", allPosts);

router.get("/posts", allPosts);

router.post("/search", searchUser);

router.post("/:userName", profile);

export default router;