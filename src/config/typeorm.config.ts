import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const typeOrmConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    const option = {
      type: configService.get('db.db_type'),
      host: configService.get('db.db_host'),
      port: configService.get('db.db_port'),
      username: configService.get('db.db_user'),
      password: configService.get('db.db_password'),
      database: configService.get('db.db_db'),
      synchronize: configService.get('db.db_sync'),
      entities: ['dist/**/*.entity{.ts,.js}'],
      retryAttempts: configService.get('NODE_ENV') === 'production' ? 10 : 1,
    };

    return option;
  },
};
