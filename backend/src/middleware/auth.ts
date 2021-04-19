import { keys } from '../config/keys';
import jwt from 'express-jwt';

export const authorize = jwt({
  secret: keys.AuthToken,
  algorithms: ['HS256'],
});
