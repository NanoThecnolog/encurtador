import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UrlModule } from './modules/url/url.module';
import { UrlRepository } from './common/repositories/url.repository';
import { AstraModule } from './common/providers/astra.module';
import { RedirectModule } from './modules/redirect/redirect.module';
import { ManageModule } from './modules/manage/manage.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    UrlModule,
    AstraModule,
    RedirectModule,
    ManageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
