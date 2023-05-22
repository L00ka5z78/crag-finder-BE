import { CustomError } from './custom-error';

export class WrongRefreshTokenErr extends CustomError {
  constructor() {
    super(401, 'Invalid refresh token');
  }
}
