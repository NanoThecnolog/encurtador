import { Injectable } from '@nestjs/common';
import { UrlRepository } from 'src/common/repositories/url.repository';

@Injectable()
export class RedirectService {

    constructor(private readonly repo: UrlRepository) { }

    //redireciona usuario pra url original
    async getOriginalUrl(shortCode: string) {

        const search = await this.repo.findByShortCode(shortCode)
        await this.repo.incrementClicks(shortCode)

        return search?.originalUrl
    }
}
