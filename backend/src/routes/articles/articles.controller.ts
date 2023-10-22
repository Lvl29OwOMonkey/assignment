import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  Header,
  HttpStatus,
  Query,
  Param,
} from "@nestjs/common";
import { Response } from "express";

import { ArticlesService } from "./articles.service";
import { Article } from "../../interfaces/articles.interface";

@Controller("articles")
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  // Find approved articles
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

  // Find pending articles
  @Header("Content-Type", "application/json")
  @Get("analyst")
  async findAnalysis(): Promise<Article[]> {
    return this.articlesService.findAll(false);
  }

  // Update an article
  @Post("analyst/:doi")
  async updateAnalysisArticle(
    @Param("doi") doi: string,
    @Body() articleData: any,
    @Res({ passthrough: true }) res: Response,
  ): Promise<string> {
    try {
      await this.articlesService.update(doi, articleData);
      res.status(HttpStatus.NO_CONTENT);
      return;
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST);

      return JSON.stringify({
        error: "Unknown error",
        message: error.message,
      });
    }
  }

  // Decline an article
  @Post("analyst/:doi/decline")
  async declineAnalysisArticle(
    @Param("doi") doi: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<string> {
    try {
      await this.articlesService.update(doi, { status: "declined" });
      res.status(HttpStatus.NO_CONTENT);
      return;
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST);

      return JSON.stringify({
        error: "Unknown error",
        message: error.message,
      });
    }
  }

  // Create an article
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
        const existingArticle = await this.articlesService.findOne(
          articleData.doi,
        );

        // Check what status the article is in
        if (existingArticle.status === "approved") {
          return JSON.stringify({
            error: "AlreadyApproved",
            message: `The DOI ${articleData.doi} has already been approved`,
          });
        } else if (existingArticle.status === "pending") {
          return JSON.stringify({
            error: "AlreadyPending",
            message: `The DOI ${articleData.doi} is already pending`,
          });
        } else if (existingArticle.status === "declined") {
          return JSON.stringify({
            error: "AlreadyDeclined",
            message: `The DOI ${articleData.doi} has already been declined`,
          });
        }

        // Unknown status so throw already exists
        return JSON.stringify({
          error: "DuplicateKey",
          message: `The DOI ${articleData.doi} already exists`,
        });
      }
      // Check if the error is a validation error
      else if (error.name === "ValidationError") {
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
      }
      // Unknown error
      else {
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
