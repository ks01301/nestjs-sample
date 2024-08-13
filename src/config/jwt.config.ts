import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  jwt_secret: process.env.JWT_SECRET as string | 'secret',
  jwt_expire: process.env.JWT_EXPIRE as string | '1d',
}));
