import { Connection } from "mongoose";
import { ArticlesSchema } from "../../schemas/articles.schema";

export const articlesProviders = [
  {
    provide: "ARTICLES_MODEL",
    useFactory: (connection: Connection) => connection.model("Article", ArticlesSchema),
    inject: ["DATABASE_CONNECTION"],
  },
];
