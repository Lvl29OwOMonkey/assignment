import { Model } from "mongoose";
import { Injectable, Inject } from "@nestjs/common";
import { Article } from "../../interfaces/articles.interface";

@Injectable()
export class ArticlesService {
  constructor(
    @Inject("ARTICLES_MODEL")
    private articleModel: Model<Article>,
  ) {}

  async create(createArticleDto: any): Promise<Article> {
    const createdArticle = new this.articleModel(createArticleDto);
    return createdArticle.save();
  }

  async findAll(): Promise<Article[]> {
    return this.articleModel.find().exec();
  }

  async findOne(id: string): Promise<Article> {
    return this.articleModel.findOne({ _id: id });
  }

  async update(id: string, updateArticleDto: any) {
    this.articleModel.updateOne({ _id: id }, updateArticleDto);
  }

  // Function to get article by title
  async getArticleTitle(titleId: string) {
    const article = await this.findArticle(titleId);
    return {
      title : article.title,
      authors : article.authors,
      source : article.source,
      pubYear : article.pubYear,
      doi : article.doi,
      summary : article.summary,
    };
  }

  // Function to find article by title
  private async findArticle(titleId: string) : Promise<Article> {
    let article;
    try {
      article = await this.articleModel.findOne({ title: titleId });
    } catch (error) {
      throw error;
    }
    if (!article) {
      throw new Error("Could not find article.");
    }
    return article;
  }

}
