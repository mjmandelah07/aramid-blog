import { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import "../App.css";
import useFetchCategories from "../context/useFetchCategories";
import useFetchArticles from "../context/useFetchArticles";
import useFetchAvatars from "../context/useFetchAvatar.js";
import PostComponent from "../components/Post";
import Footer from "../components/Footer";

const SelectedCategoryAllPost = () => {
  const location = useLocation();
  const { categories, loading } = useFetchCategories();
  const { articles, loading: articlesLoading } = useFetchArticles(
    "https://aramid-blog.onrender.com/api/articles"
  );
  const [authorNames, setAuthorNames] = useState([]);

  const avatars = useFetchAvatars(authorNames);

  // State to store the last path segment and selected category data
  const [lastPathSegment, setLastPathSegment] = useState("");
  const [selectedCategory, setSelectedCategory] = useState({});

  // Get the current path location and set the last path segment
  useEffect(() => {
    const segments = location.pathname.split("/");
    const oneSegment = segments[segments.length - 1].trim();
    const firstLetterToUpperCase =
      oneSegment.charAt(0).toUpperCase() + oneSegment.slice(1);
    setLastPathSegment(firstLetterToUpperCase);
  }, [location.pathname]);

  // Memoized filtered articles based on the selected category
  const sameCategory = useMemo(() => {
    if (!lastPathSegment || articlesLoading || loading) {
      return [];
    }

    // Get the articles and categories data
    const articlesData = articles;
    const categoriesData = categories;

    // Find the selected category from categoriesData
    const category = categoriesData.find(
      (item) => item.name === lastPathSegment
    );
    setSelectedCategory(category);

    if (!category) {
      return [];
    }

    // Filter articles based on the selected category
    const selectedArticles = articlesData.filter((article) =>
      article.categories.some((category) => category.name === lastPathSegment)
    );

    // Extract the relevant data for rendering
    const groups = selectedArticles.map((article) => ({
      id: article._id,
      title: article.title,
      description: article.description.slice(3, 240),
      date: article.createdAt,
      author: article.author,
      image: article.mainImage,
      categories: article.categories,
    }));
    const authorNames = groups.map((data) => data.author);
    setAuthorNames(authorNames);
    return groups;
  }, [lastPathSegment, articlesLoading, loading, articles, categories]);

  return (
    <>
      <div className="py-5 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <span>Category</span>
              <h3>{lastPathSegment}</h3>
              {!selectedCategory ? (
                <p>{selectedCategory}</p>
              ) : (
                <p>{selectedCategory.description}</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="site-section">
        <div className="container">
          {sameCategory.length === 0 ? (
            <div className="row">
              <div className="col-md-12">
                <p className="text-center text-info">
                  No articles available for this category yet.
                </p>
              </div>
            </div>
          ) : (
            <div className="row">
              {sameCategory.map((data, index) => {
                const summary = data.description.slice(3, 240);
                // get the date when the articles was created
                const createdAtDate = new Date(data.date);
                const options = {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                };
                const formattedDate = createdAtDate.toLocaleDateString(
                  undefined,
                  options
                );

                return (
                  <PostComponent
                    key={data._id}
                    id={data._id}
                    img={data.image}
                    categories={data.categories}
                    headshot={avatars[index]}
                    author={data.author}
                    title={data.title}
                    date={formattedDate}
                    summary={summary}
                    article={data}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default SelectedCategoryAllPost;
