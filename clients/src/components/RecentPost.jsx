import PostComponent from "./Post";
import useFetchArticles from "../context/useFetchArticles";
import useFetchAvatars from "../context/useFetchAvatar.js";

const RecentPost = () => {
  const { articles, loading } = useFetchArticles("https://aramid-blog.onrender.com/api/articles");
  const authorNames = articles.map((data) => data.author);
  const avatars = useFetchAvatars(authorNames);

  // get the last six articles
  const lastSixItems = articles.slice(-6);

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
          {lastSixItems.map((data, index) => {
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
