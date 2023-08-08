import { useState, useEffect } from 'react';
import jsonData from "../api/data.json";
import PostComponent from "./Post";

const RecentPost = () => {
  const [article, setArticle] = useState(null);

  // change this lines later to get the article data
  const articles = jsonData.articles;
  const lastSixItems = articles.slice(-6);
  

  useEffect(() => {
    // Fetch article data from API
    const fetchArticle = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/articles`);
        const articleData = await response.json();
        setArticle(articleData);
      } catch (error) {
        console.error('Error fetching article:', error);
      }
    };

    fetchArticle();
  }, []);

  return (
    <div className="site-section">
      <div className="container">
        <div className="row mb-5">
          <div className="col-12">
            <h2>Recent Posts</h2>
          </div>
        </div>
        <div className="row">
          {lastSixItems.map((data) => {
            const summary = data.description[0];
           
           

            return (
              <PostComponent
                key={data.id}
                id={data.id}
                img={data.image1}
                categories={data.categories}
                headshot={data.author.headshot}
                author={`${data.author.firstname} ${data.author.lastname}`}
                title={data.title}
                date={`${data.date.month} ${data.date.day}, ${data.date.year}`}
                summary={summary}
                article={article}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RecentPost;
