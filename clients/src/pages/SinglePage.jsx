import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import useFetchArticles from "../context/useFetchArticles";
import useFetchAvatars from "../context/useFetchAvatar.js";
import { useIncrementClickCount } from "../context/clickCount";
import "../styles/single.css";
import SinglePageSection from "../components/singlePageSection";

const SinglePage = () => {
  const { id } = useParams();
  const postId = id;
  const [authorName, setAuthorName] = useState("");

  const { articles, loading } = useFetchArticles(
    "https://aramid-blog.onrender.com/api/articles"
  );
  const avatars = useFetchAvatars([authorName]);
  const incrementClickCount = useIncrementClickCount();

  const selectedPost = articles.find((post) => post._id === postId);

  useEffect(() => {
    if (selectedPost) {
      setAuthorName(selectedPost.author);

      // Increment post click count on page visit
      incrementClickCount(postId);
    }
  }, [selectedPost, postId, incrementClickCount]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!selectedPost) {
    return <div>Post not found.</div>;
  }

  // Absolute path to the image
  const imageUrl = selectedPost.mainImage;
  const headshot = avatars;

  // get the date when the articles was created
  const createdAtDate = new Date(selectedPost.createdAt);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = createdAtDate.toLocaleDateString(undefined, options);
  return (
    <>
      <div
        className="site-cover site-cover-sm same-height overlay single-page"
        style={{ backgroundImage: `url(${imageUrl})` }}
        key={selectedPost._id}
      >
        <div className="container">
          <div className="row same-height justify-content-center">
            <div className="col-md-12 col-lg-10">
              <div className="post-entry text-center">
                {selectedPost.categories.map((item) => {
                  return (
                    <span
                      className={`post-category text-white bg-${item.color} mb-3 me-2`}
                      key={item._id}
                    >
                      {item.name}
                    </span>
                  );
                })}
                <h1 className="mb-4">
                  <Link to={`/post/${selectedPost._id}`}>
                    {selectedPost.title}
                  </Link>
                </h1>
                <div className="post-meta align-items-center text-center">
                  <figure className="author-figure mb-0 me-3 d-inline-block">
                    <img
                      src={headshot}
                      alt="profile picture"
                      className="img-fluid"
                    />
                  </figure>
                  <span className="d-inline-block mt-1">
                    By {selectedPost.author}
                  </span>
                  <span>&nbsp;-&nbsp; {formattedDate}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SinglePageSection data={selectedPost} />

      <Outlet />
    </>
  );
};

export default SinglePage;
