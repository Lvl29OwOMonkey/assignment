import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import BetterDataTable from "../../components/BetterDataTable";
import { GridColDef } from "@mui/x-data-grid";
import axios from "axios";

interface ArticlesInterface {
	id: string;
	title: string;
	authors: string[];
	source: string;
	pubYear: string;
	doi: string;
	claim: string;
	evidence: string;
}

type ArticlesProps = {
	articles: ArticlesInterface[];
};

const Articles: NextPage<ArticlesProps> = ({ articles }) => {
	const [sortedArticles, setSortedArticles] =
		useState<ArticlesInterface[]>(articles);

	const headers: GridColDef[] = [
		{ field: "title", headerName: "Title" },
		{
			field: "authors",
			headerName: "Authors",
			valueGetter: (params) => params.row.authors.join(", "),
		},
		{ field: "source", headerName: "Source" },
		{ field: "pubYear", headerName: "Publication Year" },
		{ field: "doi", headerName: "DOI" },
		{ field: "claim", headerName: "Claim" },
		{ field: "evidence", headerName: "Evidence" },
	];

	return (
		<div className="container">
			<Head>
				<title>View Articles</title>
			</Head>
			<h1>Articles Index Page</h1>

			<form
				onSubmit={async (e) => {
					e.preventDefault();
					const searchInput = document.getElementById(
						"searchInput"
					) as HTMLInputElement;
					const seDropdown = document.getElementById(
						"seDropdown"
					) as HTMLSelectElement;
					const request = await axios.get(
						`${process.env.NEXT_PUBLIC_BACKEND_URL}/articles?title=${searchInput.value}&se=${seDropdown.value}`
					);
					const articles = request.data;
					setSortedArticles(articles);
				}}
			>
				<input
					type="text"
					id="searchInput"
					className="text-black rounded-md "
					placeholder="Search Articles Here..."
					required
				/>
				<select
					id="seDropdown"
					className="text-black rounded-md ml-1"
					defaultValue={""}
					required
				>
					<option value={""} hidden disabled>
						Please select a SE method
					</option>
					<option value={"test1"}>Test 1</option>
					<option value={"test2"}>Test 2</option>
					<option value={"test3"}>Test 3</option>
				</select>
				<button
					type="submit"
					className="p-0.5 text-black bg-slate-400 rounded-md mx-1"
					id="searchButton"
				>
					Search
				</button>
				<button
					className="p-0.5 text-black bg-slate-400 rounded-md"
					type="reset"
					id="resetButton"
					onClick={async () => {
						const request = await axios.get(
							`${process.env.NEXT_PUBLIC_BACKEND_URL}/articles`
						);
						const articles = request.data;
						setSortedArticles(articles);
					}}
				>
					Reset
				</button>
			</form>

			<p>Page containing a table of articles:</p>
			{/* <SortableTable headers={headers} data={sortedArticles} /> */}
			<BetterDataTable columns={headers} rows={sortedArticles} />
		</div>
	);
};

export const getStaticProps: GetStaticProps<ArticlesProps> = async () => {
	// Fetch articles from Backend
	const request = await axios.get(
		`${process.env.NEXT_PUBLIC_BACKEND_URL}/articles`
	);
	const articles = request.data;

	return {
		props: {
			articles,
		},
	};
};

export default Articles;
