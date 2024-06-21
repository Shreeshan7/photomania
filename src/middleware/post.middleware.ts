import { Response, NextFunction, Request } from "express";
import jwt from "jsonwebtoken";
import { User } from "../entity/user.entity";
import { AppDataSource } from "../datasource";

const userRepository = AppDataSource.getRepository(User);

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_TOKEN!, async (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    if (!user || typeof user === "string") {
      return res.status(400);
    }
    const userData = await userRepository.findOneBy({
      id: parseInt(user.id as string),
    });

    (req as any).user = userData;
    next();
  });
};
