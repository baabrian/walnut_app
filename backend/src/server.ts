import App from './app';
import UserController from './controllers/UserController';
import User from './models/User';

const PORT: number = 1010;

const app = new App([new UserController()], PORT);

app.listen();
