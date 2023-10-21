import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import BetterDataTable from "../components/BetterDataTable";
import { GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import { ArticlesInterface } from "../../types/schema";

type ArticlesProps = {
	articlesData: ArticlesInterface[];
};

const Articles: NextPage<ArticlesProps> = ({ articlesData }) => {
	const [articles, setArticles] = useState<ArticlesInterface[]>(articlesData);
	const [selectedArticle, setSelectedArticle] =
		useState<ArticlesInterface | null>(null);

	const headers: GridColDef[] = [
		{ field: "title", headerName: "Title" },
		{
			field: "authors",
			headerName: "Authors",
			valueFormatter: (params) => params.value.join(", "),
		},
		{ field: "source", headerName: "Source" },
		{ field: "pubYear", headerName: "Publication Year" },
		{ field: "doi", headerName: "DOI" },
		{ field: "volume", headerName: "Volume", maxWidth: 100 },
		{
			field: "pages",
			headerName: "Pages",
			type: "number",
			align: "left",
			headerAlign: "left",
			maxWidth: 100,
		},
		{
			field: "se",
			headerName: "Software Engineering Method",
			valueFormatter: (params) =>
				params.value
					.split("_")
					.map(
						(word: string) => word[0].toUpperCase() + word.slice(1)
					)
					.join(" "),
		},
		{
			field: "submitDate",
			headerName: "Submission Date",
			type: "date",
			valueFormatter: (params) =>
				new Date(params.value as number)
					.toLocaleDateString()
					.split(" ")[0],
		},
	];

	return (
		<div className="container">
			<Head>
				<title>SPEED</title>
			</Head>
			<h1 className="text-3xl">Software Practice Empirical Evidence Database (SPEED)</h1>

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
					setArticles(articles);
				}}
			>
				<input
					type="text"
					id="searchInput"
					className="text-black rounded-md "
					placeholder="Search Articles Here..."
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
					<option value="agile">Agile</option>
					<option value="sprint">Sprint</option>
					<option value="mob_programming">Mob Programming</option>
				</select>
				<button
					type="submit"
					className="p-0.5 text-black bg-slate-400 rounded-md mx-1"
					id="searchButton"
					onClick={() => setSelectedArticle(null)}
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
						setArticles(articles);
						setSelectedArticle(null);
					}}
				>
					Reset
				</button>
			</form>

			<p>Page containing a table of articles:</p>
			<BetterDataTable
				columns={headers}
				rows={articles}
				clickAction={(params) => {
					setSelectedArticle(
						articles.find(
							(article) => article._id === params.row._id
						) || null
					);
				}}
			/>
			{selectedArticle && (
				<div>
					<h2 className="text-2xl font-bold">Selected Article</h2>
					<p>Title: {selectedArticle.title}</p>
					<p>Authors: {selectedArticle.authors.join(", ")}</p>
					<p>Source: {selectedArticle.source}</p>
					<p>Publication Year: {selectedArticle.pubYear}</p>
					<p>DOI: {selectedArticle.doi}</p>
					<p>Volume: {selectedArticle.volume}</p>
					<p>Pages: {selectedArticle.pages}</p>
					<p>
						Software Engineering Method:{" "}
						{
							// Convert first letter of each word to uppercase
							selectedArticle.se
								.split("_")
								.map(
									(word) =>
										word[0].toUpperCase() + word.slice(1)
								)
								.join(" ")
						}
					</p>
					<p>Evidence: {selectedArticle.evidence}</p>
					<p>Type: {selectedArticle.type}</p>
					<p>
						Submission Date:{" "}
						{new Date(selectedArticle.submitDate).toLocaleString()}
					</p>
				</div>
			)}
		</div>
	);
};

export const getStaticProps: GetStaticProps<ArticlesProps> = async () => {
	// Fetch articles from Backend
	const request = await axios.get(
		`${process.env.NEXT_PUBLIC_BACKEND_URL}/articles`
	);
	const articlesData = request.data;

	return {
		props: {
			articlesData,
		},
	};
};

export default Articles;
