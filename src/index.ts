import express from 'express';
import postRoutes from './routes/post.routes';
import userRoutes from './routes/user.routes'
import "reflect-metadata"
import { AppDataSource } from './datasource';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 8000;

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.json());
app.use('/posts', postRoutes);
app.use('/users', userRoutes);

app.listen(PORT, () => {
  AppDataSource.initialize()
    .then(() => {
        console.log("database initialised")
    })
    .catch((error) => console.log(error))
  console.log(`Server is running on port ${PORT}`);
});
