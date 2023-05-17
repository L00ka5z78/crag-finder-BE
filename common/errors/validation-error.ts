import { CustomError } from './custom-error';

export class ValidationErr extends CustomError {
  constructor(message: string) {
    super(400, message);
  }
}
