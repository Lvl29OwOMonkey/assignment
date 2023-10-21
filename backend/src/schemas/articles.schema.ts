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
      validate: [validYear, "Publication year must be between 1500 and current year"],
    },
    doi: {
      type: Number,
      required: [true, "DOI is required"],
      unique: true,
      validate: [notNegative, "DOI must be a positive number"],
    },
    volume: {
      type: Number,
      required: [true, "Volume is required"],
      validate: [notNegative, "Volume must be a positive number"],
    },
    pages: {
      type: Number,
      required: [true, "Pages are required"],
      validate: [notNegative, "Pages must be a positive number"],
    },
    se: {
      type: String,
    },
    evidence: {
      type: String,
    },
    type: {
      type: String,
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

function notNegative(val) {
  return val >= 1;
}

function validYear(val) {
  return val >= 1500 && val <= new Date().getFullYear();
}