import { Body, Controller, Get, Post } from "@nestjs/common";
import { ArticlesService } from "./articles.service";
import { Article } from "src/interfaces/articles.interface";

@Controller("articles")
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  findAll(): Promise<Article[]> {
    return this.articlesService.findAll();
  }

  @Post()
  async create(@Body() articleData: Article): Promise<string> {
    await this.articlesService.create(articleData);
    return "Done";
  }
}
