import { ResOk } from './interface/resok.interface';

const resOk = <T>(statusCode: number, message: string, res?: T): ResOk<T> => {
  return {
    statusCode,
    message,
    timeStamp: new Date().toISOString(),
    result: res,
  };
};

export { resOk };
