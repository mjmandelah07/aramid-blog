import jsonData from "../api/data.json";
import PostComponent from "./Post";

const RecentPost = () => {
 
  const articles = jsonData.articles;
  const lastSixItems = articles.slice(-6);

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
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RecentPost;
