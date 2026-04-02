import { DataAPIClient } from "@datastax/astra-db-ts";


const endpoint = process.env.ASTRA_DB_API_ENDPOINT
const dbToken = process.env.ASTRA_DB_APP_TOKEN
if (!endpoint || !dbToken) throw new Error("variáveis de ambiente do DB não definido")

const client = new DataAPIClient();

const db = client.db(endpoint, {
    token: dbToken
});

(async () => {
    const colls = await db.listCollections();
    console.log('Connected to AstraDB:', colls);
})();