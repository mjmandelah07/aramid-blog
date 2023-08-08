import { useState, useEffect } from "react";
import "../styles/single.css";
import "../App.css";
import { Link, Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import SinglePageComment from "../components/SinglePageComment";
import RandomPost from "../components/RandomPost";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import SideBar from "../components/SideBar";

const SinglePageSection = ({ data }) => {
  // Use this data to render the data individually
  const imageUrl2 = `${window.location.origin}/${data.image2}`;
  const imageUrl3 = `${window.location.origin}/${data.image3}`;
  const imageUrl4 = `${window.location.origin}/${data.image4}`;

  const [paragraphs, setParagraphs] = useState([]);

  useEffect(() => {
    setParagraphs(data.description);
  }, [data.description]);

  console.log();
  return (
    <>
      <section className="site-section py-lg">
        <div className="container">
          <div className="row blog-entries element-animate">
            <div className="col-md-12 col-lg-8 main-content">
              <div className="post-content-body">
                {paragraphs.slice(0, 3).map((paragraph, index) => (
                  <p key={index}>{paragraph.trim()}</p>
                ))}
                <div className="row mb-5 mt-5">
                  <div className="col-md-12 mb-4">
                    <img
                      src={imageUrl2}
                      alt="placeholder"
                      className="img-fluid rounded"
                    />
                  </div>
                  <div className="col-md-6 mb-4">
                    <img
                      src={imageUrl3}
                      alt="Image placeholder"
                      className="img-fluid rounded"
                    />
                  </div>
                  <div className="col-md-6 mb-4">
                    <img
                      src={imageUrl4}
                      alt="Image placeholder"
                      className="img-fluid rounded"
                    />
                  </div>
                </div>
                {paragraphs.slice(3).map((paragraph, index) => (
                  <p key={index}>{paragraph.trim()}</p>
                ))}
              </div>
              <div className="pt-5">
                <p>
                  Categories:
                  {data.categories.map((category, index) => (
                    <Link
                      to={category.name}
                      key={index}
                    >{` ${category.name}, `}</Link>
                  ))}
                </p>
              </div>

              <SinglePageComment />
            </div>
            <SideBar />
          </div>
        </div>
      </section>
      <RandomPost />
      <Newsletter />
      <Outlet />
      <Footer />
    </>
  );
};

SinglePageSection.propTypes = {
  data: PropTypes.object,
};

export default SinglePageSection;
