import { Module } from '@nestjs/common';
import { UrlController } from './url.controller';
import { UrlService } from './url.service';
import { UrlRepository } from 'src/common/repositories/url.repository';
import { AstraModule } from 'src/common/providers/astra.module';
import { RedisIdService } from 'src/common/utils/redis-id.service';

@Module({
  imports: [AstraModule],
  controllers: [UrlController],
  providers: [UrlService, UrlRepository, RedisIdService],

})
export class UrlModule { }
