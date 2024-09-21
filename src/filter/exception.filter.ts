import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
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

    const message = getResponse['message'];
    const error = getResponse['error'];
    const errorCode = getResponse['errorCode'];

    const logger = new Logger();
    logger.error(`[${request.method}] ${message}`, url);
    if (error) logger.debug(error, url);

    response.status(status).json({
      errorCode,
      url,
      timeStamp: new Date().toISOString(),
      message,
      error,
    });
  }
}
