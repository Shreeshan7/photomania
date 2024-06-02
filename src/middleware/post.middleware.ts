import { Response, NextFunction, Request } from "express";
import jwt from "jsonwebtoken";
import { CustomUser } from '../types';


export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }
  
  jwt.verify(token, "secretKey", (err, user) => {

    if (err) {
      return res.sendStatus(403); 
     
    }
    if (!user){
        return res.status(400)
    }
    req.user = user as CustomUser;
    next();
  });
};
