import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { DataAPIClient } from "@datastax/astra-db-ts";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new HttpExceptionFilter())




  /*const endpoint = process.env.ASTRA_DB_API_ENDPOINT
  const dbToken = process.env.ASTRA_DB_APP_TOKEN
  if (!endpoint || !dbToken) throw new Error("variáveis de ambiente do DB não definido")

  const client = new DataAPIClient();

  const db = client.db(endpoint, {
    token: dbToken
  });

  (async () => {
    const colls = await db.listCollections();
    console.log('Connected to AstraDB:', colls);
  })();*/



  const port = process.env.PORT
  if (!port) throw new Error("Porta não definida")
  await app.listen(port);
  console.log("Encurtador rodando...", port)
}
bootstrap();
