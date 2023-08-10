import { useState, useEffect } from "react";
import axios from "axios";
import { getMostClickedPosts } from "../context/popularClick";
import CountCategory from "./countCategory";

const SideBar = () => {
  const [adminData, setAdminData] = useState({});
  const [mostClickedPosts, setMostClickedPosts] = useState([]);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await axios.get(
          "https://aramid-blog.onrender.com/api/admin"
        );
        setAdminData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchMostClicked = async () => {
      try {
        const posts = await getMostClickedPosts(3);
        setMostClickedPosts(posts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAdminData();
    fetchMostClicked();
  }, []);

  return (
    <>
      <div className="col-md-12 col-lg-4 sidebar">
        <div className="sidebar-box">
          <div className="bio text-center">
            <img
              src={adminData.image}
              alt="Image Placeholder"
              className="img-fluid mb-5"
            />{" "}
            <div className="bio-body">
              <h2>{adminData.name}</h2>
              <p className="mb-4">{adminData.bio}</p>
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
              {mostClickedPosts.map((post) => (
                <li key={post._id}>
                  <a href="">
                    <img
                      src={post.mainImage}
                      alt="Image placeholder"
                      className="me-4"
                    />
                    <div className="text">
                      <h4>{post.title}</h4>
                      <div className="post-meta">
                        <span className="me-2">
                          {new Date(post.createdAt).toLocaleString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <CountCategory />
      </div>
    </>
  );
};

export default SideBar;
