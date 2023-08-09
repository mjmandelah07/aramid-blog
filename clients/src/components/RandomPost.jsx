import { Link, Outlet } from "react-router-dom";
import useFetchArticles from "../context/useFetchArticles";

const RandomPost = () => {
  const { articles, loading } = useFetchArticles(
    "http://localhost:5000/api/articles"
  );

  if (loading) {
    return <p>Loading...</p>;
  }
  // Shuffle the jsonData.articles array to get random posts
  const shuffledPosts = articles.sort(() => 0.5 - Math.random());
  const randomPosts = shuffledPosts.slice(0, 4);

  
  const options = { year: "numeric", month: "long", day: "numeric" };
  
  // Access data for each index
  const post1 = randomPosts[0];
  const post1Date = new Date(post1.createdAt);
  const formattedDate1 = post1Date.toLocaleDateString(
    undefined,
    options
  );

  const post2 = randomPosts[1];
  const post2Date = new Date(post2.createdAt);
  const formattedDate2 = post2Date.toLocaleDateString(
    undefined,
    options
  );
  const post3 = randomPosts[2];
  const post3Date = new Date(post3.createdAt);
  const formattedDate3 = post3Date.toLocaleDateString(
    undefined,
    options
  );
  const post4 = randomPosts[3];
  const post4Date = new Date(post4.createdAt);
  const formattedDate4 = post4Date.toLocaleDateString(
    undefined,
    options
  );

  // // Use this data to render the posts individually
  // const imageUrl1 = `${window.location.origin}/${post1.mainImage}`;
  // const imageUrl2 = `${window.location.origin}/${post2.image1}`;
  // const imageUrl3 = `${window.location.origin}/${post3.image1}`;
  // const imageUrl4 = `${window.location.origin}/${post4.image1}`;
  return (
    <>
      <div className="site-section bg-light">
        <div className="container">
          <div className="row mb-5">
            <div className="col-12">
              <h2>More Related Posts</h2>
            </div>
          </div>

          <div className="row align-items-stretch retro-layout">
            <div className="col-md-5 order-md-2">
              <Link
                to={`/post/${post1._id}`}
                className="hentry img-1 h-100 gradient animated"
                style={{ backgroundImage: `url(${post1.mainImage})` }}
              >
                {post1.categories.map((item) => {
                  return (
                    <span
                      className={`post-category text-white bg-${item.color} me-2`}
                      key={item._id}
                    >
                      {item.name}
                    </span>
                  );
                })}
                <div className="text">
                  <h2>{post1.title}</h2>
                  <span className="date">{formattedDate1}</span>
                </div>
              </Link>
            </div>
            <div className="col-md-7">
              <Link
                to={`/post/${post2._id}`}
                className="hentry img-2 v-height mb30 gradient animated"
                style={{ backgroundImage: `url(${post2.mainImage})` }}
              >
                {post2.categories.map((item) => {
                  return (
                    <span
                      className={`post-category text-white bg-${item.color} me-2`}
                      key={item._id}
                    >
                      {item.name}
                    </span>
                  );
                })}
                <div className="text text-sm">
                  <h2>{post2.title}</h2>
                  <span className="date">{formattedDate2}</span>
                </div>
              </Link>
              <div className="two-col d-block d-md-flex">
                <Link
                  to={`/post/${post3._id}`}
                  className="hentry v-height img-2 gradient animated"
                  style={{ backgroundImage: `url(${post3.mainImage})` }}
                >
                  {post3.categories.map((item) => {
                    return (
                      <span
                        className={`post-category text-white bg-${item.color} me-2`}
                        key={item._id}
                      >
                        {item.name}
                      </span>
                    );
                  })}
                  <div className="text text-sm">
                    <h2>{post3.title}</h2>
                    <span className="date">{formattedDate3}</span>
                  </div>
                </Link>
                <Link
                  to={`/post/${post4._id}`}
                  className="hentry v-height img-2 ms-auto gradient animated"
                  style={{ backgroundImage: `url(${post4.mainImage})` }}
                >
                  {post4.categories.map((item) => {
                    return (
                      <span
                        className={`post-category text-white bg-${item.color} me-2`}
                        key={item._id}
                      >
                        {item.name}
                      </span>
                    );
                  })}
                  <div className="text text-sm">
                    <h2>{post4.title}</h2>
                    <span className="date">{formattedDate4}</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Outlet />
    </>
  );
};

export default RandomPost;
