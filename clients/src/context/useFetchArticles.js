import { useState, useEffect } from "react";

const useFetchArticles = (url) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(url);
        const articleData = await response.json();
        setArticles(articleData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, [url]);

  return { articles, loading };
};

export default useFetchArticles;
