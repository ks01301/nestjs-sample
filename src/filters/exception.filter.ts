import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const getResponse = exception.getResponse();
    const url = request.url;

    const message = getResponse['message']
      ? getResponse['message']
      : `undefined error message. check URL: ${request.method} ${url}`;
    const error = getResponse['error'];

    const logger = new Logger();
    logger.error(`[${request.method}] ${message}`, url);
    logger.debug(error, url);

    response.status(status < 1000 ? status : HttpStatus.BAD_REQUEST).json({
      statusCode: status,
      message,
      timeStamp: new Date().toISOString(),
      url,
      error,
    });
  }
}
