import { Link, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { getMostClickedPosts } from "../context/popularClick";

const PopularPost = () => {
  const [mostClickedPosts, setMostClickedPosts] = useState([]); // Use state to store the most clicked posts

  useEffect(() => {
    const fetchMostClickedPosts = async () => {
      try {
        const posts = await getMostClickedPosts(5);
        setMostClickedPosts(posts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMostClickedPosts();
  }, []);

  return (
    <>
      <div className="site-section bg-light">
        <div className="container">
          <div className="row align-items-stretch retro-layout-2">
            <div className="col-md-4">
              {mostClickedPosts[0] && (
                <Link
                  to={`/post/${mostClickedPosts[0]._id}`}
                  className="h-entry mb-30 v-height gradient animated"
                  key={mostClickedPosts[0]._id}
                  style={{
                    backgroundImage: `url(${mostClickedPosts[0].mainImage})`,
                  }}
                >
                  <div className="text">
                    <h2>{mostClickedPosts[0].title}</h2>
                    <span className="date">
                      {" "}
                      {new Date(mostClickedPosts[0].date).toLocaleString(
                        "en-US",
                        {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}
                    </span>
                  </div>
                </Link>
              )}
              {mostClickedPosts[1] && (
                <Link
                  to={`/post/${mostClickedPosts[1]._id}`}
                  key={mostClickedPosts[1]._id}
                  className="h-entry v-height gradient animated"
                  style={{
                    backgroundImage: `url(${mostClickedPosts[1].mainImage})`,
                  }}
                >
                  <div className="text">
                    <h2>{mostClickedPosts[1].title}</h2>
                    <span className="date">
                      {" "}
                      {new Date(mostClickedPosts[1].date).toLocaleString(
                        "en-US",
                        {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}
                    </span>
                  </div>
                </Link>
              )}
            </div>
            <div className="col-md-4">
              {mostClickedPosts[2] && (
                <Link
                  to={`/post/${mostClickedPosts[2]._id}`}
                  key={mostClickedPosts[2]._id}
                  className="h-entry h-100 img-5 gradient animated"
                  style={{
                    backgroundImage: `url(${mostClickedPosts[2].mainImage})`,
                  }}
                >
                  <div className="text">
                    <div className="post-categories mb-3">
                      {mostClickedPosts[2].categories.map((item, index) => {
                        return (
                          <span
                            className={`post-category text-white bg-${item.color} mb-1 me-2`}
                            key={index}
                          >
                            {item.name}
                          </span>
                        );
                      })}
                    </div>
                    <h2>{mostClickedPosts[2].title}</h2>
                    <span className="date">
                      {" "}
                      {new Date(mostClickedPosts[2].date).toLocaleString(
                        "en-US",
                        {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}
                    </span>
                  </div>
                </Link>
              )}
            </div>

            <div className="col-md-4">
              {mostClickedPosts[0] && (
                <Link
                  to={`/post/${mostClickedPosts[3]._id}`}
                  key={mostClickedPosts[3]._id}
                  className="h-entry mb-30 v-height gradient animated"
                  style={{
                    backgroundImage: `url(${mostClickedPosts[3].mainImage})`,
                  }}
                >
                  <div className="text">
                    <h2>{mostClickedPosts[3].title}</h2>
                    <span className="date">
                      {" "}
                      {new Date(mostClickedPosts[3].date).toLocaleString(
                        "en-US",
                        {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}
                    </span>
                  </div>
                </Link>
              )}
              {mostClickedPosts[0] && (
                <Link
                  to={`/post/${mostClickedPosts[4]._id}`}
                  key={mostClickedPosts[4]._id}
                  className="h-entry  v-height gradient animated"
                  style={{
                    backgroundImage: `url(${mostClickedPosts[4].mainImage})`,
                  }}
                >
                  <div className="text">
                    <h2>{mostClickedPosts[4].title}</h2>
                    <span className="date">
                      {" "}
                      {new Date(mostClickedPosts[4].date).toLocaleString(
                        "en-US",
                        {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}
                    </span>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <Outlet />
    </>
  );
};

export default PopularPost;
