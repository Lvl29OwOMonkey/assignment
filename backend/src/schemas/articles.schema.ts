import * as mongoose from "mongoose";

export const ArticlesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    authors: {
      type: [
        {
          type: String,
          
        },
      ],
      required: [true, "At least one author is required"],
      validate: [authorsCheck, "At least one author is required"],
    },
    source: {
      type: String,
      required: [true, "Source is required"],
    },
    pubYear: {
      type: Number,
      required: [true, "Publication year is required"],
    },
    doi: {
      type: String,
      required: [true, "DOI is required"],
      unique: true,
    },
    volume: {
      type: String,
      required: [true, "Volume is required"],
    },
    pages: {
      type: Number,
      required: [true, "Pages are required"],
    },
    se: {
      type: String,
      required: [true, "Linked discussion is required"],
      default: "test1"
    },
    status: {
      type: String,
      default: "pending",
    },
    submitDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  },
);

function authorsCheck(val) {
    return val.length >= 1; 
  }