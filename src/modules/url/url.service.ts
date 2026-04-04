import { Injectable } from '@nestjs/common';
import Hashids from 'hashids';
import { UrlRepository } from 'src/common/repositories/url.repository';
import { ResponseUtil } from 'src/common/utils/response.util';
import { b62 } from 'src/utils/base62';

@Injectable()
export class UrlService {
    private hashid: Hashids
    constructor(private readonly repo: UrlRepository) {
        const secret = process.env.SECRET_SALT

        if (!secret) throw new Error("Salt secreto não definido")
        this.hashid = new Hashids(secret, 7, b62)
    }

    //retorna uma url menor
    async shorter(url: string) {
        const id = 11573 //id será gerado no redis
        const shorted = this.hashid.encode(id)
        console.log(shorted)

        try {
            await this.repo.create({
                shortCode: shorted,
                originalUrl: url,
                clicks: 0,
                createdAt: new Date()
            })
            console.log("registro feito")
        } catch (err) {
            return ResponseUtil.error(500, "Erro ao criar no banco", err)
        }


        return ResponseUtil.success({
            longUrl: url,
            shorted: `https://sh.com/${shorted}`
        })

    }



    async getByShortCode() {

    }
}
