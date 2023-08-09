import React, { useState, useEffect } from "react";
import parse from "html-react-parser";
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

  const [paragraphs, setParagraphs] = useState("");
  const parsedContent = parse(paragraphs);

  useEffect(() => {
    console.log(data.description);
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
                <div className="row">
                  {parsedContent.map((element, index) => {
                   if (element.type === "p" && element.props) {
                    const pContent = element.props.children;
            
                    // Check if the p tag contains img elements in its children
                    const imgElements = React.Children.toArray(pContent).filter(
                      (child) => child.type === "img"
                    );
                    const imgStyle = {
                      maxWidth: '100%',
                      height: '300px',
                      marginTop: '20px',
                      marginBottom: '10px'
                    };
                    if (imgElements.length > 0) {
                      // Render the img elements
                      return (
                        <div className="col-md-12" key={index}>
                          {imgElements.map((imgElement, imgIndex) => (
                            <div key={imgIndex}>{React.cloneElement(imgElement, { style: imgStyle })}</div>
                          ))}
                          </div>
                        );
                      }
                    }
                    return <div key={index}>{element}</div>;
                  })}
                </div>
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
