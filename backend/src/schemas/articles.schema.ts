import * as mongoose from "mongoose";

export const ArticlesSchema = new mongoose.Schema({
    title: String,
    authors: String,
    source: String,
    pubYear: String,
    doi: String,
    summary: String,
    submitDate: Date,
    
},{
    versionKey: false
});

