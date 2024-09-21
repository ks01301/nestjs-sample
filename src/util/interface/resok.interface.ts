export interface ResOk<T> {
  statusCode: number;
  message: string;
  timeStamp: string;
  result?: T | null;
}
