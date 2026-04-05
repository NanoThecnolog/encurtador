import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UrlService } from './url.service';
import { URLRequestDTO } from './dto/url-request.dto';

@Controller('url')
export class UrlController {

    constructor(private readonly service: UrlService) { }

    //endpoint de encurtamento
    @Post()
    shorter(@Body() { url }: URLRequestDTO) {
        return this.service.shorter(url)
    }

}
