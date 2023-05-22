import { CustomError } from './index';

export class InvalidCredentialsErr extends CustomError {
  constructor() {
    super(401, 'Invalid credentials!');
  }
}
