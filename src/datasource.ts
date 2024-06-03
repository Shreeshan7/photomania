import { DataSource } from "typeorm";
import { Post } from "./entity/post.entity";
import { User } from "./entity/user.entity";
import dotenv from 'dotenv';
dotenv.config();
console.log(process.env.DB_USERNAME)

export const AppDataSource = new DataSource({
    type: process.env.TYPE as any,
    host: process.env.HOST,
    //@ts-ignore
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.PASSWORD || '',
    database: process.env.DATABASE,
    synchronize: process.env.SYNCHRONIZE === 'true',
    logging: process.env.LOGGING === 'true',
    entities: [Post, User],
    subscribers: [],
    migrations: [], 
})

