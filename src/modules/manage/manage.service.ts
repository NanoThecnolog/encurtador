import { Injectable } from '@nestjs/common';
import { UrlRepository } from 'src/common/repositories/url.repository';
import { ResponseUtil } from 'src/common/utils/response.util';

@Injectable()
export class ManageService {

    constructor(private readonly repo: UrlRepository) { }

    async getAll() {
        try {
            const all = await this.repo.findAll()
            return ResponseUtil.success({
                result: all
            })
        } catch (err) {
            return ResponseUtil.error(500, "Erro ao buscar registros", err)
        }
    }
}
