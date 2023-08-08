import jsonData from "../api/data.json";
import { Link, Outlet } from "react-router-dom";

const RandomPost = () => {
  // Shuffle the jsonData.articles array to get random posts
  const shuffledPosts = jsonData.articles.sort(() => 0.5 - Math.random());
  const randomPosts = shuffledPosts.slice(0, 4);

  // Access data for each index
  const post1 = randomPosts[0];
  const post2 = randomPosts[1];
  const post3 = randomPosts[2];
  const post4 = randomPosts[3];

  // Use this data to render the posts individually
  const imageUrl1 = `${window.location.origin}/${post1.image1}`;
  const imageUrl2 = `${window.location.origin}/${post2.image1}`;
  const imageUrl3 = `${window.location.origin}/${post3.image1}`;
  const imageUrl4 = `${window.location.origin}/${post4.image1}`;
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
                to={`/post/${post1.id}`}
                className="hentry img-1 h-100 gradient animated"
                style={{ backgroundImage: `url(${imageUrl1})` }}
              >
                {post1.categories.map((item) => {
                  return (
                    <span
                      className={`post-category text-white bg-${item.color} me-2`}
                      key={item.id}
                    >
                      {item.name}
                    </span>
                  );
                })}
                <div className="text">
                  <h2>{post1.title}</h2>
                  <span className="date">{`${post1.date.month} ${post1.date.day}, ${post1.date.year}`}</span>
                </div>
              </Link>
            </div>
            <div className="col-md-7">
              <Link
                to={`/post/${post2.id}`}
                className="hentry img-2 v-height mb30 gradient animated"
                style={{ backgroundImage: `url(${imageUrl2})` }}
              >
                {post2.categories.map((item) => {
                  return (
                    <span
                      className={`post-category text-white bg-${item.color} me-2`}
                      key={item.id}
                    >
                      {item.name}
                    </span>
                  );
                })}
                <div className="text text-sm">
                  <h2>{post2.title}</h2>
                  <span className="date">{`${post2.date.month} ${post2.date.day}, ${post2.date.year}`}</span>
                </div>
              </Link>
              <div className="two-col d-block d-md-flex">
                <Link
                  to={`/post/${post3.id}`}
                  className="hentry v-height img-2 gradient animated"
                  style={{ backgroundImage: `url(${imageUrl3})` }}
                >
                  {post3.categories.map((item) => {
                    return (
                      <span
                        className={`post-category text-white bg-${item.color} me-2`}
                        key={item.id}
                      >
                        {item.name}
                      </span>
                    );
                  })}
                  <div className="text text-sm">
                    <h2>{post3.title}</h2>
                    <span className="date">{`${post3.date.month} ${post3.date.day}, ${post3.date.year}`}</span>
                  </div>
                </Link>
                <Link
                  to={`/post/${post4.id}`}
                  className="hentry v-height img-2 ms-auto gradient animated"
                  style={{ backgroundImage: `url(${imageUrl4})` }}
                >
                  {post4.categories.map((item) => {
                    return (
                      <span
                        className={`post-category text-white bg-${item.color} me-2`}
                        key={item.id}
                      >
                        {item.name}
                      </span>
                    );
                  })}
                  <div className="text text-sm">
                    <h2>{post4.title}</h2>
                    <span className="date">{`${post4.date.month} ${post4.date.day}, ${post4.date.year}`}</span>
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
