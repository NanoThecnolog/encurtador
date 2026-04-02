import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UrlService } from './url.service';

@Controller('v1/url')
export class UrlController {

    constructor(private readonly service: UrlService) { }

    //endpoint de encurtamento
    @Post()
    shorter(@Body('url') url: string) {
        return this.service.shorter(url)
    }

    //endpoint de redirecionamento 301 se a aplicação não tiver cache / 302 se tiver cache, metricas de acesso, painel com relatórios, etc...
    @Get(':id')
    redirect(@Param('id') id: string) {
        return this.service.redirect(id)
    }

    @Get()
    getAll() {
        console.log("chamando")
        return this.service.getAll()
    }
}
