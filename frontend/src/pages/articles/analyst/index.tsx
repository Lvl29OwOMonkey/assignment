import { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import axios from "axios";
import { ArticlesInterface } from "@/utils/schema";
import { GridColDef } from "@mui/x-data-grid";
import BetterDataTable from "@/components/BetterDataTable";
import Head from "next/head";

type ArticlesProps = {
	articles: ArticlesInterface[];
};

const Articles: NextPage<ArticlesProps> = ({ articles }) => {
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
		{ field: "volume", headerName: "Volume" },
		{
			field: "pages",
			headerName: "Pages",
			type: "number",
			align: "left",
			headerAlign: "left",
		},
	];

	const router = useRouter();

	return (
		<>
			<Head>
				<title>Analyst Page</title>
			</Head>
			<div className="container">
				<h1 className="text-3xl font-bold">Check new articles</h1>
				<p>Check the following entrys and moderate as needed:</p>
				<BetterDataTable columns={headers} rows={articles} clickAction={(params) => {
					router.push(`/articles/analyst/${params.row.doi}`);
				}}/>
			</div>
		</>
	);
};

export const getStaticProps: GetStaticProps<ArticlesProps> = async () => {
	// Fetch articles from Backend
	const request = await axios.get(
		`${process.env.NEXT_PUBLIC_BACKEND_URL}/articles/analyst`
	);
	const articles = request.data;

	return {
		props: {
			articles,
		},
	};
};

export default Articles;
