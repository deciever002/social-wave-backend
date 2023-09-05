import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';

export const getPost = async (req,res) => {
    const { id } = req.params;
    try {
        const post = await PostMessage.findById(id);

        return res.status(200).json(post);
    } catch (error) {
        console.log(error);
        res.status(404).json({message: error.message});
    }
}

export const getPosts = async (req,res) => {
    const { page } = req.query;
    try {
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT; //get the starting index of page
        const total = await PostMessage.countDocuments({});
        const posts = await PostMessage.find().sort({_id: -1}).limit(LIMIT).skip(startIndex);
        res.status(200).json({data: posts,currentPage: Number(page), numberOfPages: Math.ceil(total/ LIMIT)});
    } catch (error) {
        console.log(error);
        res.status(404).json({message: error.message});
    }
}

export const getPostsBySearch = async (req,res) => {
    const {searchQuery,tags} = req.query;
    try {
        const title = new RegExp(searchQuery,'i');

        const posts = await PostMessage.find({ $or: [{title},{tags: {$in: tags.split(',')}}]});

        res.json({data: posts});
    } catch (error) {
        console.log(error);
        res.status(404).json({message: error.message});
    }
}

export const createPost = async (req,res) => {
    const post = req.body;
    const newPost = new PostMessage({...post,creator: req.userId,createdAt: new Date().toISOString()});
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}

export const updatePost = async (req,res) => {
    const { id: _id } = req.params;
    const post = req.body;

    if(!req.userId) return res.status(401).json({message: 'UnAuthenticated'});

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('No post with this id');
    }

    try {
        const updatedPost = await PostMessage.findByIdAndUpdate(_id,post, {new: true});
        return res.json(updatedPost);
    } catch (error) {
        console.log(error)
    }
}

export const deletePost = async(req,res) => {
    const {id} = req.params;

    if(!req.userId) return res.status(401).json({message: 'UnAuthenticated'});

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send('No post with this id');
    }

    try {
        await PostMessage.findByIdAndRemove(id);
    } catch (error) {
        console.log(error);
    }

    return res.json({ message: "Post Deleted Successfully"});
}

export const likePost = async(req,res) => {
    const { id } = req.params;

    if(!req.userId) return res.status(401).json({message: 'UnAuthenticated'});

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send('No post with this id');
    }
    try {
        const post = await PostMessage.findById(id);

        const index = post.likes.findIndex((id) => id === String(req.userId));

        if(index === -1){
            //like the post
            post.likes.push(req.userId);
        }else{
            //dislike
            post.likes = post.likes.filter((id) => id != String(req.userId));
        }

        const updatedPost = await PostMessage.findByIdAndUpdate(id,post,{new: true});
        res.json(updatedPost);
    } catch (error) {
        console.log(error);
    }
}

export const commentPost = async(req,res) => {
    const {postId} = req.params;
    const {comment} = req.body;
    if(!req.userId) return res.status(401).json({message: 'UnAuthenticated'});

    if(!mongoose.Types.ObjectId.isValid(postId)){
        return res.status(404).send('No post with this id');
    }

    try {
        const post = await PostMessage.findById(postId);
        post.comments.push(comment);
        const updatedPost = await PostMessage.findByIdAndUpdate(postId,{$push: {comments: comment}},{new: true});

        return res.json(updatedPost);
    } catch (error) {
        console.log(error);
    }
}