import { CustomError } from './custom-error';

export class AuthTokenMissingErr extends CustomError {
  constructor(message: string) {
    super(401, 'Authentication token missing');
  }
}
