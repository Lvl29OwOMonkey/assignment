import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database.module";
import { ArticlesController } from "./articles.controller";
import { articlesProviders } from "./articles.providers";
import { ArticlesService } from "./articles.service";

@Module({
  imports: [DatabaseModule],
  controllers: [ArticlesController],
  providers: [ArticlesService, ...articlesProviders],
})
export class ArticlesModule {}
