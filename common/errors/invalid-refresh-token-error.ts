import { CustomError } from './custom-error';

export class WrongRefreshTokenException extends CustomError {
  constructor() {
    super(401, 'Invalid refresh token');
  }
}
