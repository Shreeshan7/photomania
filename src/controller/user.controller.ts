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
      res.status(400).json({ error: "Name and email are required" });
      return;
    }
    const newUser = await userServices.addUser(username, email, password);

    res.status(201).json({ message: "User created successfully", newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await userServices.loginUser(email, password);
    const token = jwt.sign({ id: user.id }, "secretKey", {
      expiresIn: "1h",
    });

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
