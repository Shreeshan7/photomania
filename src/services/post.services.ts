import { Post } from "../entity/post.entity";
import { AppDataSource } from "../datasource";
import path from "path";
import fs from "fs";

const postRepository = AppDataSource.getRepository(Post);

export const getAllPost = async () => {
  const allPost = await postRepository.find();
  return allPost;
};

export const createPost = async (
  caption: string,
  imageUrl: string,
  user: any
) => {
  const post = new Post();
  post.caption = caption;
  post.imageUrl = imageUrl;
  post.user = user;
  return await postRepository.save(post);
};

export const deletePost = async (postId: number, userId: number) => {
  const post = await postRepository.findOne({
    where: { id: postId, user: { id: userId } },
    relations: ["user"],
  });
  //@ts-ignore
  console.log("services", post.user.id);
  if (!post) {
    throw new Error("Forbidden");
  }

  if (post.user.id !== userId) {
    return false;
  }

  const imagePath = post.imageUrl;

  await postRepository.remove(post);

  if (imagePath) {
    const fullPath = path.resolve(imagePath);
    fs.unlink(fullPath, (err) => {
      if (err) {
        console.error("Error deleting image file:", err);
      }
    });
  }
  return true;
};

export const updatePost = async (
  postId: number,
  caption: string,
  imageUrl: string,
  userId: number
) => {
  const post = await postRepository.findOne({
    where: { id: postId, user: { id: userId } },
  });

  if (!post) {
    throw new Error("Post not found or not authorized");
  }
  const oldImagePath = post.imageUrl;
  post.caption = caption;
  post.imageUrl = imageUrl;

  await postRepository.save(post);

  if (oldImagePath) {
    const fullPath = path.resolve(oldImagePath);
    fs.unlink(fullPath, (err) => {
      if (err) {
        console.error("Error deleting old image file:", err);
      }
    });
  }
  return updatePost;
};
