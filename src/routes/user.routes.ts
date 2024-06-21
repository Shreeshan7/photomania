import { Router } from "express";
import {
  register,
  login,
  getUsers,
  myProfile,
  profileImage,
} from "../controller/user.controller";
import { authenticateToken } from "../middleware/post.middleware";
import { multerMiddleware } from "../controller/postController";

const router = Router();

router.get("/", getUsers);
router.post("/register", register);
router.post("/login", login);
router.get("/profile", authenticateToken, myProfile);
router.post("/:id/profilePicture", multerMiddleware, profileImage);

export default router;
