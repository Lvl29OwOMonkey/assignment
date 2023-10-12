import axios from "axios";

export async function SearchArticle(title: string, se: string) {
  try {
    const response = await axios.get(`http://localhost:3001/articles?se=${se}&title=${title}`, {
      headers: {
        "Content-Type": "application/json",
      }
    });

    // Handle the response data
    console.log("Response data:", response.data);

    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
