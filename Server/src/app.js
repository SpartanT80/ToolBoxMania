import express from "express";
import "dotenv/config";

import {PORT, HOST} from "./config/const.js";
import router from "./router/index.routes.js";

const app = express();

app
    .use(express.static("public"))
    .use(express.json());

app.use(router);

app.listen(PORT, () => console.log(`Listening at http://${HOST}:${PORT}`))