import React from "react";
import { useLocation } from "react-router-dom";

const Category = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  const lastPathSegment = pathSegments[pathSegments.length - 1];

  return (
    <>
      <h1>{lastPathSegment}</h1>
    </>
  );
};

export default Category;
