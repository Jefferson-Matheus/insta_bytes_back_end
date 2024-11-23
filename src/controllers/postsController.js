import { createPost, getAllPosts } from "../models/postModel.js";

class PostController{
    async listAllPosts(req,res){
        const posts = await getAllPosts();

        res.status(200).json(posts);
    }

    async createNewPost(req,res){
        const post = req.body;

        try {
            const postCreated = await createPost(post);
            res.status(200).json(postCreated);
        } catch (error) {
            console.error(error.message);
            res.status(500).json({"error":"request failed"});
        }
    }
}

export {PostController};
