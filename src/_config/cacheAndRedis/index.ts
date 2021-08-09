import { Module, CacheModule } from '@nestjs/common';
import redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    CacheModule.registerAsync({
      useFactory: () => ({
        store: redisStore,
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        password: process.env.REDIS_PASS,
      }),
    }),
  ],
  exports: [CacheModule],
})
export class AppCacheModule {}
