import { Link, Outlet } from "react-router-dom";
import jsonData from "../api/data.json";
import { getMostClickedPosts } from "../context/popularClick";

const PopularPost = () => {
  // Get the 5 most clicked posts
  const mostClickedPosts = getMostClickedPosts(jsonData, 5);
  // Access data for each index
  const post1 = mostClickedPosts[0];
  const post2 = mostClickedPosts[1];
  const post3 = mostClickedPosts[2];
  const post4 = mostClickedPosts[3];
  const post5 = mostClickedPosts[4];

  // Use this data to render the posts individually
  const imageUrl1 = `${window.location.origin}/${post1.image1}`;
  const imageUrl2 = `${window.location.origin}/${post2.image1}`;
  const imageUrl3 = `${window.location.origin}/${post3.image1}`;
  const imageUrl4 = `${window.location.origin}/${post4.image1}`;
  const imageUrl5 = `${window.location.origin}/${post5.image1}`;

  return (
    <>
      <div className="site-section bg-light">
        <div className="container">
          <div className="row align-items-stretch retro-layout-2">
            <div className="col-md-4">
              <Link
                to={`/post/${post1.id}`}
                className="h-entry mb-30 v-height gradient animated"
                key={post1.id}
                style={{ backgroundImage: `url(${imageUrl1})` }}
              >
                <div className="text">
                  <h2>{post1.title}</h2>
                  <span className="date">{`${post1.date.month} ${post1.date.day}, ${post1.date.year}`}</span>
                </div>
              </Link>
              <Link
                to={`/post/${post2.id}`}
                key={post2.id}
                className="h-entry v-height gradient animated"
                style={{ backgroundImage: `url(${imageUrl2})` }}
              >
                <div className="text">
                  <h2>{post2.title}</h2>
                  <span className="date">{`${post2.date.month} ${post2.date.day}, ${post2.date.year}`}</span>
                </div>
              </Link>
            </div>
            <div className="col-md-4">
              <Link
                to={`/post/${post3.id}`}
                key={post3.id}
                className="h-entry h-100 img-5 gradient animated"
                style={{ backgroundImage: `url(${imageUrl3})` }}
              >
                <div className="text">
                  <div className="post-categories mb-3">
                    {post3.categories.map((item) => {
                      return (
                        <span
                          className={`post-category text-white bg-${item.color} mb-1 me-2`}
                          key={item.id}
                        >
                          {item.name}
                        </span>
                      );
                    })}
                  </div>
                  <h2>{post3.title}</h2>
                  <span className="date">{`${post3.date.month} ${post3.date.day}, ${post3.date.year}`}</span>
                </div>
              </Link>
            </div>

            <div className="col-md-4">
              <Link
                to={`/post/${post4.id}`}
                key={post4.id}
                className="h-entry mb-30 v-height gradient animated"
                style={{ backgroundImage: `url(${imageUrl4})` }}
              >
                <div className="text">
                  <h2>{post4.title}</h2>
                  <span className="date">{`${post4.date.month} ${post4.date.day}, ${post4.date.year}`}</span>
                </div>
              </Link>
              <Link
                to={`/post/${post5.id}`}
                key={post5.id}
                className="h-entry  v-height gradient animated"
                style={{ backgroundImage: `url(${imageUrl5})` }}
              >
                <div className="text">
                  <h2>{post5.title}</h2>
                  <span className="date">{`${post5.date.month} ${post5.date.day}, ${post5.date.year}`}</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Outlet />
    </>
  );
};

export default PopularPost;
