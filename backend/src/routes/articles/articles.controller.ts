import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  Header,
  HttpStatus,
  Query,
} from "@nestjs/common";
import { Response } from "express";

import { ArticlesService } from "./articles.service";
import { Article } from "../../interfaces/articles.interface";

@Controller("articles")
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Header("Content-Type", "application/json")
  @Get()
  async findArticles(
    @Query("title") title: string,
    @Query("se") se: string,
  ): Promise<Article[]> {
    if (!title && !se) {
      return this.articlesService.findAll(true);
    }
    return this.articlesService.findArticle(title, se, true);
  }

  @Header("Content-Type", "application/json")
  @Get("analyst")
  async findAnalysis(
    @Query("title") title: string,
    @Query("se") se: string,
  ): Promise<Article[]> {
    if (!title && !se) {
      return this.articlesService.findAll(false);
    }
    return this.articlesService.findArticle(title, se, false);
  }

  // Endpoint for searching articles by title
  /* @Get(":id")
  getProduct(@Param("id") title: string) {
    return this.articlesService.findArticle(title);
  }*/

  @Header("Content-Type", "application/json")
  @Post()
  async create(
    @Body() articleData: Article,
    @Res({ passthrough: true }) res: Response,
  ): Promise<string> {
    try {
      await this.articlesService.create(articleData);
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST);
      if (error.code === 11000) {
        return JSON.stringify({
          error: "DuplicateKey",
          message: `The DOI ${articleData.doi} already exists`,
        });
      } else if (error.name === "ValidationError") {
        const errors = Object.keys(error.errors).map((key) => {
          return {
            field: key,
            message: error.errors[key].message,
          };
        });
        return JSON.stringify({
          error: "ValidationError",
          message: errors,
        });
      } else {
        return JSON.stringify({
          error: "Unknown error",
          message: error.message,
        });
      }
    }
    return JSON.stringify({
      success: true,
      message: `The article ${articleData.doi} has been created`,
    });
  }
}
