import { CustomError } from './custom-error';

export class AuthTokenMissingError extends CustomError {
  constructor(message: string) {
    super(401, 'Authentication token missing');
  }
}
