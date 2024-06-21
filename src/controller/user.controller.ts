import { Request, Response } from "express";
import * as userServices from "../services/user.services";
import jwt from "jsonwebtoken";

export const getUsers = async (req: Request, res: Response) => {
  const users = await userServices.getAllUsers();
  res.json(users);
};

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      res.status(400).json({ error: "Name, email, and password are required" });
      return;
    }
    try {
      const newUser = await userServices.addUser(username, email, password);
      res.status(201).json({ message: "User created successfully", newUser });
    } catch (error) {
      if ((error as Error).message === "Email already exists") {
        res.status(400).json({ error: "Email already exists" });
      } else {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await userServices.loginUser(email, password);
    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_TOKEN!,
      {
        expiresIn: "1h",
      }
    );

    res.setHeader("Authorization", `Bearer ${token}`);

    res.status(200).json({
      message: "login successful",
      token,
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(400).json({ error: "user not found" });
  }
};

export const myProfile = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;

    res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
      imageUrl: user.imageUrl,
    });
  } catch (error) {
    console.error("Error in fetching profile ok", error);
    res.status(500).json({ message: "internal Server Error" });
  }
};

export const profileImage = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id, 10);

    if (isNaN(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "Image not uploaded" });
    }

    await userServices.getImage(userId, file.path);

    res.status(200).json({
      message: "Image uploaded successfully",
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
