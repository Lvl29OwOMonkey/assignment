import { Document } from "mongoose";

export interface Article extends Document {
  title: string;
  authors: string[];
  source: string;
  pubYear: string;
  doi: string;
  summary: string;
  submitDate: Date;
}
