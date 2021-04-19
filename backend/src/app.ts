import express from 'express';
import { keys } from './config/keys';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import { Controller } from './interfaces/Controller';
import bodyParser from 'body-parser';

export default class App {
  public app: express.Application;
  public port: number;
  private hostUrl: string;

  constructor(controllers: Controller[], port: number) {
    this.app = express();
    this.port = port;
    this.hostUrl = `http://localhost:${port}`;

    this.initGlobalMiddleWares();
    this.initControllers(controllers);
    this.connectToMongoDB();
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Backend Server Listening on Port: ${this.port}`);
    });
  }

  private initControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
  }

  private async connectToMongoDB() {
    try {
      const connection = await mongoose.connect(keys.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      if (connection) {
        console.log('Connected to DB');
      }
    } catch (e) {
      console.log('failed to connect');
    }
  }

  private initGlobalMiddleWares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(
      cookieSession({
        name: 'session',
        keys: [keys.cookieKey],
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
      })
    );
  }
}
