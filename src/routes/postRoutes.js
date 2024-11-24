import express from "express";

import multer from "multer";

import swaggerUi from 'swagger-ui-express';

import swaggerFile from "../../swagger.json" assert { type: "json" };

import {PostController} from "../controllers/postsController.js"

import { UploadImageController } from "../controllers/uploadController.js";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); 
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname); 
    }
  });
  
  
  const upload = multer({ storage: storage });

const route = (app) => {
    app.use(express.json());

    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

    app.get('/posts',new PostController().listAllPosts);

    app.post('/post', new PostController().createNewPost);

    app.post('/upload', upload.single("image"), new UploadImageController().uploadImage);

    app.put('/upload/:id', new UploadImageController().updateNewPost);
};



export default route;