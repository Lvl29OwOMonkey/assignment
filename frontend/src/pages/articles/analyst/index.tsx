import { GetServerSideProps, NextPage } from "next";
import axios from "axios";
import { ArticlesInterface } from "../../../../types/schema";
import { GridColDef } from "@mui/x-data-grid";
import BetterDataTable from "../../../components/BetterDataTable";
import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";

type ArticlesProps = {
	articles: ArticlesInterface[];
};

const Articles: NextPage<ArticlesProps> = ({ articles }) => {
	const router = useRouter();

	const headers: GridColDef[] = [
		{ field: "title", headerName: "Title" },
		{
			field: "authors",
			headerName: "Authors",
			valueGetter: (params: any) => params.row.authors.join(", "),
		},
		{ field: "source", headerName: "Source" },
		{ field: "pubYear", headerName: "Publication Year" },
		{ field: "doi", headerName: "DOI" },
		{ field: "volume", headerName: "Volume" },
		{
			field: "pages",
			headerName: "Pages",
			type: "number",
			align: "left",
			headerAlign: "left",
		},
	];

	async function refresh() {
		router.replace(router.asPath);
	}

	const [selectedArticle, setSelectedArticle] =
		useState<ArticlesInterface | null>(null);

	const [updateError, setUpdateError] = useState<string | null>(null);
	const [addError, setAddError] = useState<string | null>(null);

	return (
		<div>
			<Head>
				<title>Analyst Page</title>
			</Head>
			<div className="container">
				<h1 className="text-3xl font-bold">Check new articles</h1>
				<p>Check the following entries and moderate as needed:</p>
				<BetterDataTable
					columns={headers}
					rows={articles}
					clickAction={(params) => {
						const article = articles.find(
							(article) => article.doi === params.row.doi
						);
						setSelectedArticle(article || null);
						setUpdateError(null);
						setAddError(null);
						// Get the form and reset it
						const updateForm = document.getElementById(
							"updateForm"
						) as HTMLFormElement;
						const addForm = document.getElementById(
							"addForm"
						) as HTMLFormElement;
						if (updateForm) updateForm.reset();
						if (addForm) addForm.reset();
					}}
				/>
				<div className="flex justify-center mt-5">
					{selectedArticle && (
						<div className="text-center">
							<h1 className="text-3xl font-bold">
								Selected article
							</h1>
							<div className="flex space-x-8 text-left">
								<div>
									<h2 className="text-2xl font-bold">
										Current Data:
									</h2>
									<form
										className="flex flex-col space-y-2"
										id="updateForm"
										onSubmit={async (e) => {
											e.preventDefault();
											setUpdateError(null);

											const formData = new FormData(
												e.target as HTMLFormElement
											);

											const data = {
												title: formData.get("title"),
												authors: formData
													.get("authors")
													?.toString()
													.split(", "),
												source: formData.get("source"),
												pubYear:
													formData.get("pubYear"),
												volume: formData.get("volume"),
												pages: formData.get("pages"),
											};

											const response = await axios.post(
												`${process.env.NEXT_PUBLIC_BACKEND_URL}/articles/analyst/${selectedArticle.doi}`,
												data,
												{
													validateStatus: () => true,
												}
											);

											if (response.status === 204) {
												setSelectedArticle(null);
												await refresh();
											} else {
												setUpdateError(
													response.data.message
												);
											}
										}}
									>
										<div className="space-x-2">
											<label htmlFor="title">
												Title:
											</label>
											<input
												type="text"
												name="title"
												id="title"
												placeholder="Title..."
												className="text-black rounded-md"
												defaultValue={
													selectedArticle.title
												}
												required
											/>
										</div>
										<div className="space-x-2">
											<label htmlFor="authors">
												Authors:
											</label>
											<input
												type="text"
												name="authors"
												id="authors"
												placeholder="Authors..."
												className="text-black rounded-md"
												defaultValue={selectedArticle.authors.join(
													", "
												)}
												required
											/>
										</div>
										<div className="space-x-2">
											<label htmlFor="source">
												Source:
											</label>
											<input
												type="text"
												name="source"
												id="source"
												placeholder="Source..."
												className="text-black rounded-md"
												defaultValue={
													selectedArticle.source
												}
												required
											/>
										</div>
										<div className="space-x-2">
											<label htmlFor="pubYear">
												Publication Year:
											</label>
											<input
												type="number"
												name="pubYear"
												id="pubYear"
												placeholder="Publication Year..."
												className="text-black rounded-md"
												defaultValue={
													selectedArticle.pubYear
												}
												required
											/>
										</div>
										<p>DOI: {selectedArticle.doi}</p>
										<div className="space-x-2">
											<label htmlFor="volume">
												Volume:
											</label>
											<input
												type="text"
												name="volume"
												id="volume"
												placeholder="Volume..."
												className="text-black rounded-md"
												defaultValue={
													selectedArticle.volume
												}
												required
											/>
										</div>
										<div className="space-x-2">
											<label htmlFor="pages">
												Pages:
											</label>
											<input
												type="number"
												name="pages"
												id="pages"
												placeholder="Pages..."
												className="text-black rounded-md"
												defaultValue={
													selectedArticle.pages
												}
												required
											/>
										</div>
										<p>
											Submitted Date:{" "}
											{new Date(
												selectedArticle.submitDate
											).toLocaleString()}
										</p>
										<div className="flex space-x-5 justify-center">
											<button
												className="p-2 bg-white rounded-md text-black"
												type="submit"
											>
												Update
											</button>
											<button
												className="p-2 bg-white rounded-md text-black"
												type="reset"
												onClick={() =>
													setUpdateError(null)
												}
											>
												Reset
											</button>
										</div>
										{updateError && (
											<p className="text-red-500">
												{updateError}
											</p>
										)}
									</form>
								</div>
								<div className="flex flex-col">
									<h2 className="text-2xl font-bold">
										Add Data:
									</h2>
									<form
										id="addForm"
										className="flex flex-col space-y-4"
										onSubmit={async (e) => {
											e.preventDefault();
											setAddError(null);

											const formData = new FormData(
												e.target as HTMLFormElement
											);
											const data = Object.fromEntries(
												formData.entries()
											);

											data["status"] = "approved";

											const response = await axios.post(
												`${process.env.NEXT_PUBLIC_BACKEND_URL}/articles/analyst/${selectedArticle.doi}`,
												data,
												{
													validateStatus: () => true,
												}
											);

											if (response.status === 204) {
												setSelectedArticle(null);
												await refresh();
											} else {
												setAddError(
													response.data.message
												);
											}
										}}
									>
										<div className="space-x-2">
											<label htmlFor="sePractice">
												Software Engineering Practice:
											</label>
											<select
												name="se"
												id="sePractice"
												className="text-black rounded-md"
												defaultValue=""
												required
											>
												<option
													value=""
													hidden
													disabled
												>
													Select SE practice...
												</option>
												<option value="agile">
													Agile
												</option>
												<option value="sprint">
													Sprint
												</option>
												<option value="mob_programming">
													Mob Programming
												</option>
											</select>
										</div>
										<div className="flex flex-col">
											<label htmlFor="evidence">
												Evidence:
											</label>
											<textarea
												name="evidence"
												id="evidence"
												placeholder="Evidence..."
												className="text-black rounded-md"
												required
											/>
										</div>
										<div className="space-x-2">
											<label htmlFor="type">Type:</label>
											<input
												type="text"
												name="type"
												id="type"
												placeholder="Type..."
												className="text-black rounded-md"
												required
											/>
										</div>

										<div className="flex space-x-5 justify-center">
											<button
												className="p-2 bg-white rounded-md text-black"
												type="submit"
											>
												Approve
											</button>
											<button
												className="p-2 bg-white rounded-md text-black"
												type="reset"
												onClick={() =>
													setSelectedArticle(null)
												}
											>
												Close
											</button>
										</div>
										{addError && (
											<p className="text-red-500">
												{addError}
											</p>
										)}
									</form>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export const getServerSideProps: GetServerSideProps<ArticlesProps> = async () => {
	// Fetch articles from Backend
	const request = await axios.get(
		`${process.env.NEXT_PUBLIC_BACKEND_URL}/articles/analyst`,
		{
			validateStatus: () => true,
		}
	);

	if (request.status !== 200) {
		return {
			props: {
				articles: [],
			},
		};
	}

	const articles = request.data;

	return {
		props: {
			articles,
		},
	};
};

export default Articles;
