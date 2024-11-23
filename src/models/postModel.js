import 'dotenv/config';

import { ObjectId } from "mongodb";

import {Connection} from "../config/dbConfig.js";

const conection = await new Connection().connectionToDatabase(process.env.STRING_CONECTION);

export async function getAllPosts() {
    const db = conection.db("imersao");

    const colection = db.collection("posts");

    return await colection.find().toArray();

}

export async function createPost(newPost) {
    const db = conection.db("imersao");

    const colection = db.collection("posts");

    return colection.insertOne(newPost);
}

export async function updatePost(id,post) {
    const db = conection.db("imersao");

    const colection = db.collection("posts");

    const objectId = ObjectId.createFromHexString(id);

    return colection.updateOne({_id: new ObjectId(objectId)}, {$set:post });
}

