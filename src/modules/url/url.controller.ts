import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UrlService } from './url.service';

@Controller('url')
export class UrlController {

    constructor(private readonly service: UrlService) { }

    //endpoint de encurtamento
    @Post()
    shorter(@Body('url') url: string) {
        return this.service.shorter(url)
    }

}
