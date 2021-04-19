import { Controller } from '../interfaces/Controller';
import User from '../models/User';
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

export default class UserController implements Controller {
  public path = '/api/user';
  public router = express.Router();

  constructor() {
    this.initalizeRoutes();
  }

  private initalizeRoutes() {
    this.router.post(`${this.path}/register`, this.registerUser);
    this.router.get(`${this.path}/login`, this.loginUser);
  }

  private registerUser = async (req: Request, res: Response) => {
    try {
      const exists = await User.findOne({
        userName: req.body.userName,
      }).exec();

      if (exists) {
        return res.status(401).json('UserName exists');
      }

      const user = new User();
      user.userName = req.body.userName;
      user.firstName = req.body.firstName;
      user.lastName = req.body.lastName;
      await user.setPassword(req.body.password);
      const savedUser = await user.save();
      const tokenSignature = user.generateJWT();

      return res.status(200).json(tokenSignature);
    } catch (e) {
      console.log(e);
    }
  };

  private loginUser = async (req: Request, res: Response) => {
    try {
      const user = await User.findOne({
        userName: req.query.userName as string,
      }).exec();

      if (!user) {
        return res.status(401).json('User name dne');
      }

      if (!user.isPasswordValid(req.query.password as string)) {
        return res.status(403).json('Invalid password');
      }

      const tokenSignature = user.generateJWT();

      return res.status(200).json(tokenSignature);
    } catch (e) {
      console.log(e);
    }
  };
}
