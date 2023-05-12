import { CustomError } from './custom-error';

export class NotFoundError extends CustomError {
  constructor() {
    super(404, 'Not Found!');
  }
}
