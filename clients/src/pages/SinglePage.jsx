import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useIncrementClickCount } from "../context/clickCount";
import { Link, Outlet } from "react-router-dom";
import "../styles/single.css";
import PropTypes from "prop-types";
import jsonData from "../api/data.json";
import SinglePageSection from '../components/singlePageSection';


const SinglePage = () => {
  // Use the useParams hook to get the URL parameters
  const { id } = useParams();
  const postId = parseInt(id);

  // Find the selected blog post from jsonData based on the postId
  const selectedPost = jsonData.articles.find((post) => post.id === postId);

  // Use the custom hook to increment the click count
  const incrementClickCount = useIncrementClickCount();

  useEffect(() => {
    // Increment post click count on page visit
    incrementClickCount(postId);
  }, [postId, incrementClickCount]);

  if (!selectedPost) {
    return <div>Post not found.</div>;
  }

  // Absolute path to the image
  const imageUrl = `${window.location.origin}/${selectedPost.image1}`;
  const headshot = `${window.location.origin}/${selectedPost.author.headshot}`;
  return (
    <>
      <div
        className="site-cover site-cover-sm same-height overlay single-page"
        style={{ backgroundImage: `url(${imageUrl})` }}
        key={selectedPost.id}
      >
        <div className="container">
          <div className="row same-height justify-content-center">
            <div className="col-md-12 col-lg-10">
              <div className="post-entry text-center">
                {selectedPost.categories.map((item) => {
                  return (
                    <span
                      className={`post-category text-white bg-${item.color} mb-3 me-2`}
                      key={item.id}
                    >
                      {item.name}
                    </span>
                  );
                })}
                <h1 className="mb-4">
                  <Link to={`/post/${selectedPost.id}`}>
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
                    By {`${selectedPost.author.firstname} ${selectedPost.author.lastname}`}
                  </span>
                  <span>&nbsp;-&nbsp; {`${selectedPost.date.month} ${selectedPost.date.day}, ${selectedPost.date.year}` }</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SinglePageSection data={selectedPost}/>
              

      <Outlet />
    </>
  );
};

SinglePage.propTypes = {
  match: PropTypes.object,
};

export default SinglePage;
