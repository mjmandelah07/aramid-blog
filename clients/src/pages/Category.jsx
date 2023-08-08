import { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import "../App.css";
import categoriesData from "../api/categories.json";
import jsonData from "../api/data.json";
import PostComponent from "../components/Post";
import Footer from "../components/Footer";

const SelectedCategoryAllPost = () => {
  const location = useLocation();

  // get the data from the post data object and access its properties for the category selected

  const [lastPathSegment, setLastPathSegment] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // get the current path location and get the last segment to display
  useEffect(() => {
    const segments = location.pathname.split("/");
    const oneSegment = segments[segments.length - 1];
    const firstLetterToUpperCase =
      oneSegment.charAt(0).toUpperCase() + oneSegment.slice(1);
    setLastPathSegment(firstLetterToUpperCase);
  }, [location.pathname]);

  // Memoize the filtered articles based on the selected category
  const sameCategory = useMemo(() => {
    if (!lastPathSegment || !jsonData.articles || !categoriesData.categories) {
      return [];
    }

    // get the datas from the category database, post database and get their datas
    const articles = jsonData.articles;
    const categories = categoriesData.categories;

    // Find the selected category from categoriesData
    const category = categories.find((item) => item.name === lastPathSegment);

    setSelectedCategory(category);

    if (!category) {
      return [];
    }

    // Filter the articles based on the selected category which is the lastPathSegment
    const selectedArticles = articles.filter((article) =>
      article.categories.some((category) => category.name === lastPathSegment)
    );

    // Extract the groups from the filtered articles
    const groups = selectedArticles.map((article) => ({
      id: article.id,
      title: article.title,
      description: article.description,
      date: article.date,
      author: article.author,
      images: [article.image1, article.image2, article.image3, article.image4],
      categories: article.categories,
    }));

    return groups;
  }, [lastPathSegment]);

  return (
    <>
      <div className="py-5 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <span>Category</span>
              <h3>{lastPathSegment}</h3>
              <p>{selectedCategory.description}</p>
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
              {sameCategory.map((data) => {
                const summary = data.description[0];
                return (
                  <PostComponent
                    key={data.id}
                    id={data.id}
                    img={data.images[0]}
                    categories={data.categories}
                    headshot={data.author.headshot}
                    author={`${data.author.firstname} ${data.author.lastname}`}
                    title={data.title}
                    date={`${data.date.month} ${data.date.day}, ${data.date.year}`}
                    summary={summary}
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
