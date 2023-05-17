import { CustomError } from './custom-error';

export class UserWithExistingEmailError extends CustomError {
  constructor(email: string) {
    super(400, `User with email ${email} already exists`);
  }
}
