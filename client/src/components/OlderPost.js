/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link, Outlet } from "react-router-dom";
import jsonData from '../api/api.json'

const OlderPost = () => {
  const articles = jsonData.articles;
  console.log(articles.image1);

  return (
    <>
    <div className="site-section bg-light">
      <div className="container">
        <div className="row align-items-stretch retro-layout-2">
          <div className="col-md-4">
            <Link
              to="post"
              className="h-entry mb-30 v-height gradient animated"
              key={articles.id}
              style={{ backgroundImage: `url(${articles.image1})` }}
            >
              <div className="text">
                <h2>The AI magically removes moving objects from videos.</h2>
                <span className="date">July 19, 2019</span>
              </div>
            </Link>
            <Link
              to="post"
              className="h-entry  v-height gradient animated"
              style={{ backgroundImage: `url(${articles.image1})` }}
            >
              <div className="text">
                <h2>The AI magically removes moving objects from videos.</h2>
                <span className="date">July 19, 2019</span>
              </div>
            </Link>
          </div>
          <div className="col-md-4">
          <Link
              to="post"
              className="h-entry h-100 img-5 gradient animated"
              style={{ backgroundImage: `url(${articles.image1})` }}
            >
                <div className="text">
                    <div className="post-categories mb-3">
                    <span className="post-category me-2 bg-danger">Travel</span>
                    <span className="post-category bg-primary">Food</span>
                    </div>
                    <h2>The AI magically removes moving objects from videos.</h2>
                    <span className="date">July 19, 2019</span>
                </div>
            </Link>
          </div>
          <div className="col-md-4">
          <Link
              to="post"
              className="h-entry mb-30 v-height gradient animated"
              style={{ backgroundImage: `url(${articles.image1})` }}
            >
              <div className="text">
              <h2>The 20 Biggest Fintech Companies In America 2019</h2>
                <span className="date">July 19, 2019</span>
              </div>
            </Link>
            <Link
              to="post"className="h-entry  v-height gradient animated"
              style={{ backgroundImage: `url(${articles.image1})` }}
            >
              <div className="text">
              <h2>The 20 Biggest Fintech Companies In America 2019</h2>
                <span className="date">July 19, 2019</span>
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

export default OlderPost;
