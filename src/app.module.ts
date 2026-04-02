import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UrlModule } from './modules/url/url.module';
import { UrlRepository } from './common/repositories/url.repository';
import { AstraModule } from './common/providers/astra.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    UrlModule,
    AstraModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
