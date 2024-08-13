import { HttpException, HttpStatus } from '@nestjs/common';

const resOk = (
  message: string = 'success request',
  result?: any,
  status: number = HttpStatus.OK,
) => {
  return {
    statusCode: status < 1000 ? status : HttpStatus.OK,
    timeStamp: new Date().toISOString(),
    message,
    result,
  };
};

const resError = (
  message?: string,
  error?: any,
  status: number = HttpStatus.BAD_REQUEST,
) => {
  throw new HttpException({ message, error }, status);
};

export { resOk, resError };
