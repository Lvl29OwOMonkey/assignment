// import { GetStaticProps, NextPage } from "next";
// import SortableTable from "../../components/table/SortableTable";
// import Head from "next/head";
// import { useState } from "react";

// interface ArticlesInterface {
//   id: string;
//   title: string;
//   authors: string[];
//   source: string;
//   pubYear: string;
//   doi: string;
//   claim: string;
//   evidence: string;
// }

// type ArticlesProps = {
//   articles: ArticlesInterface[];
// };


// const Articles: NextPage<ArticlesProps> = ({ articles }) => {
//   const [sortedArticles, /* setSortedArticles */] = useState<ArticlesInterface[]>(articles);
//   const [sortKey, /* setSortKey */] = useState<keyof ArticlesInterface>("title");

//   sortedArticles.sort((a: ArticlesInterface, b: ArticlesInterface) => {
//     return a[sortKey].toString().toLowerCase() > b[sortKey].toString().toLowerCase() ? 1 : -1;
//   });

//   const headers: { key: keyof ArticlesInterface; label: string }[] = [
//     { key: "title", label: "Title" },
//     { key: "authors", label: "Authors" },
//     { key: "source", label: "Source" },
//     { key: "pubYear", label: "Publication Year" },
//     { key: "doi", label: "DOI" },
//     { key: "claim", label: "Claim" },
//     { key: "evidence", label: "Evidence" },
//   ];

//   return (
//     <div className="container">
//       <Head>
//         <title>View Articles</title>
//       </Head>
//       <h1>Articles Index Page</h1>
//       <p>Page containing a table of articles:</p>
//       <SortableTable headers={headers} data={sortedArticles} />
//     </div>
//   );
// };

// export const getStaticProps: GetStaticProps<ArticlesProps> = async () => {
//   // Fetch articles from Backend
//     const articles = await (await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/articles`)).json();
    
//   return {
//     props: {
//       articles,
//     },
//   };
// };

// export default Articles;

// src/pages/DataPage.tsx

import * as React from "react";
import TextField from "@mui/material/TextField";
import TableComponent from "../../components/TableComponent";

const index: React.FC = () => {
  const [searchText, setSearchText] = React.useState('');
  const [filteredData, setFilteredData] = React.useState([]); // State to store filtered data

  // Replace 'data' with your actual dataset
  const data = [
    // Your data here
  ];

  React.useEffect(() => {
    // Filter data based on the search text
    const filtered = data.filter((row) =>
      Object.values(row).some((value) =>
        value.toString().toLowerCase().includes(searchText.toLowerCase())
      )
    );
    setFilteredData(filtered);
  }, [searchText, data]);

  return (
    <div>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ margin: '16px' }}
      />
      <TableComponent data={filteredData.length > 0 ? filteredData : data} />
    </div>
  );
};

export default index;
