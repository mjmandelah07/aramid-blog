/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";

const PostComponent =  ({
  img,
  categories,
  title,
  summarry,
  headshot,
  author,
  date,
}) => {

  const [imagePath, setImagePath] = useState('');

  useEffect(() => {
    import(img).then(module => setImagePath(module.default))
  }, [img]);

  return (
    <>
    <div className="col-lg-4 mb-4">
      <div className="entry2">
        <Link to="post">
          <img src={imagePath} alt="blog" className="img-fluid rounded" />
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
            <Link to="post">{title}</Link>
          </h2>
          <div className="post-meta align-items-center text-start clearfix">
            <figure className="author-figure mb-0 me-3 float-start">
              <img src={headshot} alt="headshot" className="img-fluid" />
            </figure>
            <span className="d-inline-block mt-1">
              By <Link to="post">{author}</Link>
            </span>
            <span>&nbsp;-&nbsp; {date}</span>
          </div>
          <p>{summarry}...</p>
          <p>
            <Link to="post">Read More</Link>
          </p>
        </div>
      </div>
    </div>

    <Outlet />
    </>
  );
};

export default PostComponent;
