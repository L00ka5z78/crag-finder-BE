import { CustomError } from './index';

export class InvalidAuthTokenErr extends CustomError {
  constructor() {
    super(401, 'Invalid auth token!');
  }
}
