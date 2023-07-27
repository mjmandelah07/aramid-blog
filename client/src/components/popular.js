/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import jsonData from "../api/api.json"
import { Link, Outlet } from "react-router-dom";


const Popular = () => {
  const articles = jsonData.articles;
  return (
    <>
    <div className="site-section bg-light">
      <div className="container">
        <div className="row align-items-stretch retro-layout">
          <div className="col-md-5 order-md-2">
            <Link
              to="post"
              className="hentry img-1 h-100 gradient animated"
              style={{ backgroundImage: `URL(${articles.image1})` }}
            >
              <span className="post-category text-white bg-danger">Travel</span>
              <div className="text">
                <h2>The 20 Biggest Fintech Companies In America 2019</h2>
                <span>February 12, 2019</span>
              </div>
            </Link>
          </div>
          <div className="col-md-7">
            <Link
              to="post"
              className="hentry img-2 v-height mb30 gradient animated"
              style={{ backgroundImage: `URL(${articles.image1})` }}
            >
              <span className="post-category text-white bg-success">
                Nature
              </span>
              <div className="text text-sm">
                <h2>The 20 Biggest Fintech Companies In America 2019</h2>
                <span>February 12, 2019</span>
              </div>
            </Link>
            <div class="two-col d-block d-md-flex">
              <Link
              to="post" className="hentry v-height img-2 gradient animated"
                style={{ backgroundImage: `URL(${articles.image1})` }}
              >
                <span class="post-category text-white bg-primary">Sports</span>
                <div class="text text-sm">
                  <h2>The 20 Biggest Fintech Companies In America 2019</h2>
                  <span>February 12, 2019</span>
                </div>
              </Link>
              <Link
              to="post"
                className="hentry v-height img-2 ms-auto gradient animated"
                style={{ backgroundImage: `URL(${articles.image1})` }}>
                <span className="post-category text-white bg-warning">
                  Lifestyle
                </span>
                <div class="text text-sm">
                  <h2>The 20 Biggest Fintech Companies In America 2019</h2>
                  <span>February 12, 2019</span>
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

export default Popular;
