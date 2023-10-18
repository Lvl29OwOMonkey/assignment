import { GetStaticProps, NextPage } from "next";
import SortableTable from "../../components/table/SortableTable";
import Head from "next/head";
import { useState } from "react";

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
  const [sortedArticles, /* setSortedArticles */] = useState<ArticlesInterface[]>(articles);
  const [sortKey, /* setSortKey */] = useState<keyof ArticlesInterface>("title");

  sortedArticles.sort((a: ArticlesInterface, b: ArticlesInterface) => {
    return a[sortKey].toString().toLowerCase() > b[sortKey].toString().toLowerCase() ? 1 : -1;
  });

  const headers: { key: keyof ArticlesInterface; label: string }[] = [
    { key: "title", label: "Title" },
    { key: "authors", label: "Authors" },
    { key: "source", label: "Source" },
    { key: "pubYear", label: "Publication Year" },
    { key: "doi", label: "DOI" },
    { key: "claim", label: "Claim" },
    { key: "evidence", label: "Evidence" },
  ];
  
  return (
    <div className="container">
      <Head>
        <title>View Articles</title>
      </Head>
      <h1>Articles Index Page</h1>

      <input type="text" id="searchInput" placeholder="Search Articles Here..."/>
      <select id="seDropdown" defaultValue={""}>
        <option value={""} hidden disabled>Please select a SE method</option>
        <option value={"test1"}>Test 1</option>
        <option value={"test2"}>Test 2</option>
        <option value={"test3"}>Test 3</option>
      </select>
      <button onClick={async ()=>{
          const searchInput = document.getElementById("searchInput") as HTMLInputElement;
          const seDropdown = document.getElementById("seDropdown") as HTMLSelectElement;
          const articles = await SearchArticle(searchInput.value, seDropdown.value);
          setSortedArticles(articles);
        }} type="button" id="searchButton">Search</button>

      <p>Page containing a table of articles:</p>
      {/* <SortableTable headers={headers} data={sortedArticles} /> */}
      <BetterDataTable rows={sortedArticles} />
    </div>
  );
};

export const getStaticProps: GetStaticProps<ArticlesProps> = async () => {
  // Fetch articles from Backend
    const request = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/articles`);
    const articles = request.data;

  return {
    props: {
      articles,
    },
  };
};

export default Articles;

// src/pages/DataPage.tsx