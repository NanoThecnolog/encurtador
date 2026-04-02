// astra.provider.ts
import { Logger, Provider } from '@nestjs/common'
import { DataAPIClient } from '@datastax/astra-db-ts'

export const AstraProvider: Provider = {
    provide: 'ASTRA_DB',
    useFactory: async () => {

        const endpoint = process.env.ASTRA_DB_API_ENDPOINT
        const dbToken = process.env.ASTRA_DB_APP_TOKEN


        if (!endpoint || !dbToken)
            throw new Error("variáveis de ambiente do DB não definido")

        const logger = new Logger("AstraProvider")

        const client = new DataAPIClient()
        const db = client.db(endpoint, {
            token: dbToken,
        })

        try {
            await db.createCollection('urls').catch(() => logger.error("Erro ao criar/selecionar collection"))
            //await db.collection('urls').createIndex({shortCode: 1})
            const collections = await db.listCollections()
            logger.log(`DB connected. Collections: ${collections.length}`)
        } catch (err) {
            logger.error("Erro ao conectar ao banco Astra", err)
            throw err
        }

        //await db.listCollections()
        //console.log("connected db")

        return db
    },
}