export interface ArticlesInterface {
	id: string;
	title: string;
	authors: string[];
	source: string;
	pubYear: string;
	doi: string;
	volume: number;
	pages: number;
	se: string;
	status: string;
	submitDate: Date;
	claim: string;
	evidence: string;
}