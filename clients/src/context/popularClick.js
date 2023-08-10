import axios from "axios";

export const getMostClickedPosts = async (limit = 5) => {
  try {
    const response = await axios.get("https://aramid-blog.onrender.com/api/click-count");
    const sortedPosts = response.data.sort((a, b) => b.clickCount - a.clickCount);
    const mostClickedPosts = sortedPosts.slice(0, limit);
    return mostClickedPosts; // Make sure to return the data
  } catch (error) {
    console.error(error);
    throw error; // Rethrow the error to be caught in the component
  }
};


