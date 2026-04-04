import { Module } from '@nestjs/common';
import { ManageController } from './manage.controller';
import { ManageService } from './manage.service';
import { UrlRepository } from 'src/common/repositories/url.repository';

@Module({
  controllers: [ManageController],
  providers: [ManageService, UrlRepository]
})
export class ManageModule { }
