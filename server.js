import express from "express";

import route from "./src/routes/postRoutes.js";

const app = express();

app.use(express.static("uploads"))

route(app);

app.listen(3000, () => {
    console.log("Server running");
});

