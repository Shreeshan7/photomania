import { Router } from 'express';
import { allPost, createPostController, deletePostController, multerMiddleware, updatePostController } from '../controller/postController';
import { authenticateToken } from '../middleware/post.middleware';


const router = Router();

router.post('/', authenticateToken, multerMiddleware, createPostController);
router.get('/', allPost);
router.delete('/:id', authenticateToken, deletePostController);
router.put('/:id', authenticateToken, multerMiddleware, updatePostController);


export default router;
