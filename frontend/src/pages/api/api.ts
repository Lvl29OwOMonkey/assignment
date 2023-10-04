import axios from "axios";

export async function SearchArticle(article: string) {
  try {
    const response = await axios.get(`http://localhost:3001/articles/${article}`, {
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
