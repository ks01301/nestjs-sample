import { registerAs } from '@nestjs/config';

export default registerAs(
  'app',
  (): Record<string, any> => ({
    port: parseInt(process.env.PORT) | 3000,
  }),
);
