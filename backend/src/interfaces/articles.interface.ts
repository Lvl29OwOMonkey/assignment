import { Document } from "mongoose";

export interface Article extends Document {
  // Core Info
	_id: string;
	status: string;
	submitDate: Date;
	
	// Submission Info
	title: string;
	authors: string[];
	source: string;
	pubYear: string;
	doi: string;
	volume: number;
	pages: number;
	
	// Analyst Info
	se: string;
	evidence: string;
	type: string;
}
