import { Inject, Injectable } from "@nestjs/common"
import { Url } from "../@types/cassandra"
import { Db } from "@datastax/astra-db-ts"

@Injectable()
export class UrlRepository {
    constructor(
        @Inject('ASTRA_DB')
        private readonly db: Db,
    ) { }

    private collection = this.db.collection<Url>('urls')

    findByShortCode(shortCode: string) {
        return this.collection.findOne({ shortCode })
    }

    create(data: Url) {
        return this.collection.insertOne(data)
    }

    incrementClicks(shortCode: string) {
        return this.collection.updateOne(
            { shortCode },
            { $inc: { clicks: 1 } },
        )
    }

    findAll(limit = 100, offset = 0) {
        return this.collection.find({}).sort({ createdAt: -1 }).skip(offset).limit(limit).toArray()
    }
}