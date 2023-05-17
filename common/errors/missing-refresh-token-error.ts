import { CustomError } from './custom-error';

export class RefreshTokenMissingError extends CustomError {
  constructor(message: string) {
    super(401, 'Refresh token missing!');
  }
}
