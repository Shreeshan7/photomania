import { Request, Response } from "express";
import * as postServices from "../services/post.services";
import multer from "multer";

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
});

export const allPost = async (req: Request, res: Response) => {
  const post = await postServices.getAllPost();
  res.json(post);
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
    console.log("controller", req.user.id)

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

    const updatedPost = await postServices.updatePost(
      postId,
      caption,
      image.path,
      req.user.id
    );

    res.status(200).json(updatedPost);
  } catch (error) {
    console.log("error");
    res.status(500).json({ error: "Something went wrong" });
  }
};
export const multerMiddleware = upload.single("image");
