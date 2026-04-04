import { Module } from '@nestjs/common';
import { RedirectController } from './redirect.controller';
import { RedirectService } from './redirect.service';
import { UrlRepository } from 'src/common/repositories/url.repository';

@Module({
  controllers: [RedirectController],
  providers: [RedirectService, UrlRepository]
})
export class RedirectModule { }
