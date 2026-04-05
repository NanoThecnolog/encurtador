import { Injectable } from "@nestjs/common";
import { RedisService } from "src/infra/redis/redis.service";

@Injectable()
export class RedisIdService {

    constructor(private readonly redisService: RedisService) { }

    async generate(): Promise<number> {
        const redis = this.redisService.getClient()
        return redis.incr('url:id')
    }
}