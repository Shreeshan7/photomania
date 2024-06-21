import express from "express";
import postRoutes from "./routes/post.routes";
import userRoutes from "./routes/user.routes";
import "reflect-metadata";
import { AppDataSource } from "./datasource";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());

app.use(express.static("public"));

app.use(express.json());
app.use("/posts", postRoutes);
app.use("/users", userRoutes);

app.listen(PORT, () => {
  AppDataSource.initialize()
    .then(() => {
      console.log("database initialised");
    })
    .catch((error) => console.log(error));
  console.log(`Server is running on port ${PORT}`);
});
