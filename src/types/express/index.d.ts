import { CustomUser } from "../../types";

declare global {
     namespace Express {
        export interface Request {
            user: CustomUser
        }
    }
}

