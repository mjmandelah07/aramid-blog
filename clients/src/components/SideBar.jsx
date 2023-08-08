/* eslint-disable no-unused-vars */
import { useState } from "react";
import postData from "../api/data.json";
import categoriesData from "../api/categories.json";
import adminData from "../api/admin.json";
import { getMostClickedPosts } from "../context/popularClick";
import CountCategory from './countCategory'

const SideBar = () => {
  const [postJsonData, setpostData] = useState(postData);
  const [categoriesJsonData, setcategoriesData] = useState(categoriesData);
  const [adminJsonData, setadminData] = useState(adminData.details[0]);

  const Headshot = `${window.location.origin}/${adminJsonData.headshot}`;

  // Get the 3 most clicked posts
  const mostClickedPosts = getMostClickedPosts(postJsonData, 3);
  // Access data for each index
  const post1 = mostClickedPosts[0];
  const post2 = mostClickedPosts[1];
  const post3 = mostClickedPosts[2];

  // Use this data to render the posts individually
  const imageUrl1 = `${window.location.origin}/${post1.image1}`;
  const imageUrl2 = `${window.location.origin}/${post2.image1}`;
  const imageUrl3 = `${window.location.origin}/${post3.image1}`;

  return (
    <>
      <div className="col-md-12 col-lg-4 sidebar">
        <div className="sidebar-box">
          <div className="bio text-center">
            <img
              src={Headshot}
              alt="Image Placeholder"
              className="img-fluid mb-5"
            />{" "}
            <div className="bio-body">
              <h2>{adminJsonData.name}</h2>
              <p className="mb-4">{adminJsonData.about}</p>
              <p>
                <a
                  href="https://mojisola-aramide-portfolio.netlify.app/"
                  className="btn btn-primary btn-sm rounded px-4 py-2"
                  target="blank"
                >
                  Read my bio
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="sidebar-box">
          <h3 className="heading">Popular Posts</h3>
          <div className="post-entry-sidebar">
            <ul>
              <li>
                <a href="">
                  <img
                    src={imageUrl1}
                    alt="Image placeholder"
                    className="me-4"
                  />
                  <div className="text">
                    <h4>
                      {post1.title}
                    </h4>
                    <div className="post-meta">
                      <span className="me-2">{`${post1.date.month} ${post1.date.day}, ${post1.date.year}`} </span>
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <a href="">
                  <img
                    src={imageUrl2}
                    alt="Image placeholder"
                    className="me-4"
                  />
                  <div className="text">
                    <h4>
                      {post2.title}
                    </h4>
                    <div className="post-meta">
                      <span className="me-2">{`${post2.date.month} ${post2.date.day}, ${post2.date.year}`}</span>
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <a href="">
                  <img
                    src={imageUrl3}
                    alt="Image placeholder"
                    className="me-4"
                  />
                  <div className="text">
                    <h4>
                     {post3.title}
                    </h4>
                    <div className="post-meta">
                      <span className="me-2">{`${post3.date.month} ${post3.date.day}, ${post3.date.year}`}</span>
                    </div>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <CountCategory />
      </div>
    </>
  );
};

export default SideBar;
