import express from "express";

import multer from "multer";

//import listAllPosts from "../controllers/postsController.js";

import {PostController} from "../controllers/postsController.js"

import { UploadImageController } from "../controllers/uploadController.js";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // Especifica o diretório para armazenar as imagens enviadas
      cb(null, 'uploads/'); // Substitua por seu caminho de upload desejado
    },
    filename: function (req, file, cb) {
      // Mantém o nome original do arquivo por simplicidade
      cb(null, file.originalname); // Considere usar uma estratégia de geração de nomes únicos para produção
    }
  });
  
  // Cria uma instância do middleware Multer
  const upload = multer({ storage: storage });



const route = (app) => {
    app.use(express.json());

    app.get('/posts',new PostController().listAllPosts);

    app.post('/post', new PostController().createNewPost);

    app.post('/upload', upload.single("image"), new UploadImageController().uploadImage);

    app.put('/upload/:id', new UploadImageController().updateNewPost);
};



export default route;