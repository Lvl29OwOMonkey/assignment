import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { configDotenv } from "dotenv";

async function bootstrap() {
  configDotenv();
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    preflightContinue: false,
    optionsSuccessStatus: 200,
  });
  await app.listen(3001);
}
bootstrap();
