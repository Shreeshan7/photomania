import { Router } from "express";
import {
  allPost,
  createPostController,
  deletePostController,
  getPostByIDController,
  getPostsByUserIdController,
  multerMiddleware,
  updatePostController,
} from "../controller/postController";
import { authenticateToken } from "../middleware/post.middleware";

const router = Router();

router.post("/", authenticateToken, multerMiddleware, createPostController);
router.get("/", allPost);
router.get("/:id", getPostByIDController);
router.delete("/:id", authenticateToken, deletePostController);
router.put("/:id", authenticateToken, multerMiddleware, updatePostController);
router.get("/user/:id", getPostsByUserIdController);

export default router;
