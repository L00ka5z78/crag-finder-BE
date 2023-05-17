import { CustomError } from './index';

export class InvalidAuthTokenError extends CustomError {
  constructor() {
    super(401, 'Invalid auth token!');
  }
}
