import { HttpException, HttpStatus } from '@nestjs/common';

const resError = (
  error: any,
  message?: string,
  status: number = HttpStatus.BAD_REQUEST,
) => {
  throw new HttpException({ message, error }, status);
};

export { resError };
