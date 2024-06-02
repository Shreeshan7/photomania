import { DataSource } from "typeorm";
import { Post } from "./entity/post.entity";
import { User } from "./entity/user.entity";


export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "post-express",
    synchronize: true,
    logging: false,
    entities: [Post, User],
    subscribers: [],
    migrations: [],  
})

