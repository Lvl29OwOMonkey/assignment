import { Model } from "mongoose";
import { Injectable, Inject } from "@nestjs/common";
import { Article } from "../../interfaces/articles.interface";

@Injectable()
export class ArticlesService {
  constructor(
    @Inject("ARTICLES_MODEL")
    private articleModel: Model<Article>,
  ) {}

  /**
   * Create an article
   * @param newData Article data to create 
   * @returns 
   */
  async create(newData: any): Promise<Article> {
    const createdArticle = new this.articleModel(newData);
    return createdArticle.save();
  }

  /**
   * Get all articles
   * @param approved Approved articles or pending articles
   * @returns List of articles
   */
  async findAll(approved: boolean): Promise<Article[]> {
    if (approved) return this.articleModel.find({ status: "approved" }).exec();
    return this.articleModel.find({status: "pending"}).exec();
  }

  /**
   * Get an article by DOI
   * @param doi Article DOI
   * @returns Article
   */
  async findOne(doi: string): Promise<Article> {
    return this.articleModel.findOne({ doi });
  }

  /**
   * Update an article
   * @param doi Article DOI
   * @param newData Article data to update
   */
  async update(doi: string, newData: any) {
    await this.articleModel.updateOne({ doi }, newData);
  }

  /**
   * Find articles by title and SE Method
   * @param title Title of the article
   * @param se SE Method
   * @param approved Approved articles or pending articles
   * @returns List of articles
   */
  async findArticle(title: string, se: string, approved) : Promise<Article[]> {
    return await this.articleModel.find({title:{$regex:`^${title}`, $options:"i"}, se, status: approved ? "approved" : "pending"});
  }

}
