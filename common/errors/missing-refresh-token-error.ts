import { CustomError } from './custom-error';

export class RefreshTokenMissingErr extends CustomError {
  constructor(message: string) {
    super(401, 'Refresh token missing!');
  }
}
