import dotenv from 'dotenv';
import express, { Express } from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';

import routes from './routes';

dotenv.config();

class Server {
  private express: Express

  private PORT = process.env.PORT

  constructor() {
    this.express = express();

    this.init();
  }

  init() {
    this.middlewares();
    this.routes();

    this.express.listen(this.PORT, () => console.log(`server online in port ${this.PORT}`));
  }

  // database() {}

  middlewares() {
    this.express.use(morgan('dev'));
    this.express.use(bodyParser.json());
  }

  routes() {
    this.express.use(routes);
  }
}

const server = new Server();
