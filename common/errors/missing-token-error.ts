import { CustomError } from './custom-error';

export class AuthTokenMissingErr extends CustomError {
  constructor() {
    super(401, 'Authentication token missing');
  }
}
