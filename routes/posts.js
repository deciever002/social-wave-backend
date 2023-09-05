import express from 'express';

const router = express.Router();

import { createPost, getPosts,updatePost,deletePost,likePost,getPostsBySearch,getPost,commentPost } from '../controllers/posts.js';
import auth from '../middleware/auth.js';

router.get('/search',getPostsBySearch);
router.get('/',getPosts);
router.get('/:id',getPost);
router.post('/',auth, createPost);
router.patch('/:id',auth,updatePost);
router.delete('/:id',auth,deletePost);
router.patch('/:id/likePost',auth,likePost)
router.post('/:postId/commentPost',auth,commentPost)

export default router;