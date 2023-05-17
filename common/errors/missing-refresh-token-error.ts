import { CustomError } from './custom-error';

export class RefreshTokenMissingErr extends CustomError {
  constructor() {
    super(401, 'Refresh token missing!');
  }
}
