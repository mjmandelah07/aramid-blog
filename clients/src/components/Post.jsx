import { Link, Outlet } from "react-router-dom";
import PropTypes from 'prop-types';
import { useIncrementClickCount } from '../context/clickCount'

const PostComponent =  ({
  img,
  categories,
  title,
  summary,
  headshot,
  author,
  date,
  id,
  article 
}) => {
  const incrementClickCount = useIncrementClickCount();

  const handleReadMoreClick = () => {
    // Increment the click count when user clicks "Read More"
    incrementClickCount(article._id);
    // Navigate to the article page
  };
  // Use this data to render the posts individually
  const imageUrl1 = `${window.location.origin}/${img}`;
  const authorHeadshot = `${window.location.origin}/${headshot}`;
  
  return (
 <>
    <div className="col-lg-4 mb-4" key={id}>
      <div className="entry2">
        <Link to={`/post/${id}`} onClick={handleReadMoreClick}>
          <img src={imageUrl1} alt="blog" className="img-fluid rounded" />
        </Link>
        <div className="excerpt">
          {categories.map((item) => {
            return (
              <span
                className={`post-category text-white bg-${item.color} mb-3 me-2`}
                key={item.id}
              >
                {item.name}
              </span>
            );
          })}

          <h2>
            <Link to={`/post/${id}`} onClick={handleReadMoreClick}>{title}</Link>
          </h2>
          <div className="post-meta align-items-center text-start clearfix">
            <figure className="author-figure mb-0 me-3 float-start">
              <img src={authorHeadshot} alt="headshot" className="img-fluid" />
            </figure>
            <span className="d-inline-block mt-1">
              By {author}
            </span>
            <span>&nbsp;-&nbsp; {date}</span>
          </div>
          <p>{summary}...</p>
          <p>
            <Link to={`/post/${id}`} onClick={handleReadMoreClick}>Read More</Link>
          </p>
        </div>
      </div>
    </div>

    <Outlet />
    </>
  );
};

PostComponent.propTypes = {
  img: PropTypes.string,
  categories: PropTypes.array,
  title: PropTypes.string,
  summary: PropTypes.string,
  headshot: PropTypes.string,
  author: PropTypes.string,
  date: PropTypes.string,
  id: PropTypes.number,
  article: PropTypes.object
}



export default PostComponent;
