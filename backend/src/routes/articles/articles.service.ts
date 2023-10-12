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

  // Function to find article by title
  async findArticle(title: string, se: string) : Promise<Article[]> {
    return await this.articleModel.find({title:{$regex:`^${title}`, $options:"i"}, se});
  }

}
