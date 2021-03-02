import { Router } from 'express';
import multer from 'multer';
import PostController from './controllers/PostController';
import config from './config/multer';

const router = Router();
const postController = new PostController();

router.post('/posts', multer(config).single('file'), postController.store);
router.get('/posts', postController.index);
router.delete('/posts/:id', postController.delete);

export { router };