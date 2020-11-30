import dotenv from "dotenv";
import express, { Express } from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";

import routes from "./routes";
import routesApi from "./microservice/api/routes";
import setupSequelize from "./services/setupSequelize";

dotenv.config();

class Server {
    private express: Express;

    private PORT = process.env.PORT;

    constructor() {
        this.express = express();

        this.init();
    }

    init() {
        this.middlewares();
        this.routes();
        this.database();

        this.express.listen(this.PORT, () => console.log(`server online in port ${this.PORT}`));
    }

    async database() {
        await setupSequelize();
    }

    middlewares() {
        this.express.use(cors());
        this.express.use(morgan("dev"));
        this.express.use(bodyParser.json());
    }

    routes() {
        this.express.use(routes);
        this.express.use(routesApi);
    }
}

const server = new Server();
