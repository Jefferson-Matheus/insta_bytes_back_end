import fs from "fs";

import { createPost } from "../models/postModel.js";

import generateDescripitonWithGemini from "../services/geminiService.js";

import { updatePost } from "../models/postModel.js";

class UploadImageController{
    async uploadImage(req,res){
        const newPost = {
            descripition: "",
            imgUrl: req.file.originalname,
            alt: ""
        }

        try {
            const postCreated = await createPost(newPost);

            const updatedImage = `uploads/${postCreated.insertedId}.png`;

            fs.renameSync(req.file.path, updatedImage);

            res.status(200).json(postCreated);
        } catch (error) {
            console.error(error.message);

            res.status(500).json({"error":"failed request"});
        }
    }

    async updateNewPost(req,res){
        const id = req.params.id;

        const urlImage = `http://localhost:3000/${id}.png`;

        try {
            const imgBuffer = fs.readFileSync(`uploads/${id}.png`);

            const descripition = await generateDescripitonWithGemini(imgBuffer);

            const post = {
                imgUrl: urlImage,
                descripition: descripition,
                alt: req.body.alt
            }

            const postCreated = await updatePost(id,post);

            res.status(200).json(postCreated);
        } catch (error) {
            console.error(error.message);

            res.status(500).json({"error":"failed request"});
        }
    }
}

export {UploadImageController};