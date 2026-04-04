import { Controller, Get, Logger, Param, Res } from '@nestjs/common';
import { RedirectService } from './redirect.service';
import { Response } from 'express';
import { ResponseUtil } from 'src/common/utils/response.util';

@Controller('redirect')
export class RedirectController {

    constructor(private readonly service: RedirectService) { }


    //endpoint de redirecionamento 301 se a aplicação não tiver cache / 302 se tiver cache, metricas de acesso, painel com relatórios, etc...
    //id aqui é o shortcode da url encurtada
    @Get(':id')
    async redirect(@Param('id') id: string, @Res() res: Response) {
        const logger = new Logger('console')
        logger.log("Chamando rota...")
        const originalUrl = await this.service.getOriginalUrl(id)
        if (!originalUrl) return ResponseUtil.error(400, 'url original não encontrada')
        logger.log('URL original encontrada')
        return res.redirect(302, `https://${originalUrl}`)
    }
}
