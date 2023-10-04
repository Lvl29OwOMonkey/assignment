import { GetStaticProps, NextPage } from "next";
import SortableTable from "../../components/table/SortableTable";

interface ArticlesInterface {
  id: string;
  title: string;
  authors: string;
  source: string;
  pubYear: string;
  doi: string;
  claim: string;
  evidence: string;
  moderation: string;
}

type ArticlesProps = {
  articles: ArticlesInterface[];
};

const Articles: NextPage<ArticlesProps> = ({ articles }) => {
  const headers: { key: keyof ArticlesInterface; label: string }[] = [
    { key: "title", label: "Title" },
    { key: "authors", label: "Authors" },
    { key: "source", label: "Source" },
    { key: "pubYear", label: "Publication Year" },
    { key: "doi", label: "DOI" },
    { key: "claim", label: "Claim" },
    { key: "evidence", label: "Evidence" },
    { key: "moderation", label: "Moderation"}
  ];

  return (
    <div className="container">
      <h1>Moderate New Articles</h1>
      <p>Check the following entrys and moderate as needed:</p>
      <SortableTable headers={headers} data={articles} />
    </div>
  );
};

export const getStaticProps: GetStaticProps<ArticlesProps> = async () => {
  // Fetch articles from Backend
    const articles = await (await fetch("http://localhost:3001/articles")).json();
    
  return {
    props: {
      articles,
    },
  };
};

export default Articles;
