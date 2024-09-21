import { HttpException } from '@nestjs/common';
import { ErrorCode } from 'src/constant/errorCode';

const resError = (
  statusCode: number,
  errorCode: ErrorCode,
  error?: any,
): HttpException => {
  throw new HttpException(
    {
      errorCode,
      message: ErrorCode[errorCode],
      error,
    },
    statusCode,
  );
};

export { resError };
