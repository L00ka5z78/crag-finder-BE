import * as bcrypt from 'bcrypt';
import { CustomError } from '../common';

export const hashData = async (data: string): Promise<string> => {
  try {
    return await bcrypt.hash(data, 10);
  } catch (error) {
    throw new CustomError(500, 'Internal server error');
  }
};

export const checkHash = async (
  data: string,
  encrypted: string
): Promise<boolean> => {
  try {
    return await bcrypt.compare(data, encrypted);
  } catch (error) {
    throw new CustomError(500, 'Internal server error');
  }
};
