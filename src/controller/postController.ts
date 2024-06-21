import { Request, Response } from "express";
import * as postServices from "../services/post.services";
import multer from "multer";

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: multer.FileFilterCallback
) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedTypes.includes(file.mimetype)) {
    callback(null, true);
  } else {
    callback(new Error("Only JPEG, JPG, and PNG files are allowed"));
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "public/uploads");
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
    console.log("run");
  },
});

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

export const allPost = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 8;

  const posts = await postServices.getAllPost(page, limit);
  res.json(posts);
};

export const getPostByIDController = async (req: Request, res: Response) => {
  try {
    const postId = parseInt(req.params.id);
    const post = await postServices.getPostByID(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error("Error fetching post by ID:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const createPostController = async (req: Request, res: Response) => {
  try {
    const { caption } = req.body;

    const image = req.file;
    console.log(image);
    if (!image) {
      return res.status(400).json({ error: "Image file is required" });
    }

    const post = await postServices.createPost(
      caption,
      image.path,
      req.user.id
    );

    res.status(201).json(post);
  } catch (error) {
    console.log("error");
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const deletePostController = async (req: Request, res: Response) => {
  try {
    const postId = parseInt(req.params.id);
    const userId = req.user.id;
    console.log("controller", req.user.id);

    const deleted = await postServices.deletePost(postId, userId);

    if (!deleted) {
      return res
        .status(403)
        .json({ error: "You are not authorized to delete this post" });
    }

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.log("error");
    //@ts-ignore
    res.status(403).json({ error: error.message });
  }
};

export const updatePostController = async (req: Request, res: Response) => {
  try {
    const postId = parseInt(req.params.id);
    const { caption } = req.body;
    const image = req.file;

    if (!image) {
      return res.status(400).json({ error: "Image file is required" });
    }

    await postServices.updatePost(postId, caption, image.path, req.user.id);

    res.status(200).json({ message: "Post updated successfully" });
  } catch (error: any) {
    if (error.message === "Post not found or not authorized") {
      return res.status(404).json({ error: error.message });
    }
    console.error("Update post error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getPostsByUserIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = parseInt(req.params.id);
    const posts = await postServices.getPostsByUserId(userId);

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts by user ID:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const multerMiddleware = upload.single("image");
