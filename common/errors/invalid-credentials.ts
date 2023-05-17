import { CustomError } from './index';

export class InvalidCredentialsError extends CustomError {
  constructor() {
    super(401, 'Invalid credentials!');
  }
}
