import { useState, useEffect } from "react";
import PostComponent from "./Post";
import useFetchArticles from "../context/useFetchArticles";
import useFetchAvatars from "../context/useFetchAvatar.js";

const RecentPost = () => {
  const apiUrl = import.meta.env.VITE_BACKEND_BASE_URL;
  const { articles, loading } = useFetchArticles(`${apiUrl}/articles`);
  const [authorNames, setAuthorNames] = useState([]);
  const [lastSixArticles, setLastSixArticles] = useState([]);
  const avatars = useFetchAvatars(authorNames);

  // get the last six articles
  useEffect(() => {
    const getLastSixArticles = articles.slice(-6);
    setLastSixArticles(getLastSixArticles);
    setAuthorNames(getLastSixArticles.map((article) => article.author));
  }, [articles]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="site-section">
      <div className="container">
        <div className="row mb-5">
          <div className="col-12">
            <h2>Recent Posts</h2>
          </div>
        </div>
        <div className="row">
          {lastSixArticles.map((data, index) => {
            const summary = data.description.slice(3, 240);
            // get the date when the articles was created
            const createdAtDate = new Date(data.createdAt);
            const options = { year: "numeric", month: "long", day: "numeric" };
            const formattedDate = createdAtDate.toLocaleDateString(
              undefined,
              options
            );

            return (
              <PostComponent
                key={data._id}
                id={data._id}
                img={data.mainImage}
                categories={data.categories}
                headshot={avatars[index]}
                author={data.author}
                title={data.title}
                date={formattedDate}
                summary={summary}
                article={data}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RecentPost;
