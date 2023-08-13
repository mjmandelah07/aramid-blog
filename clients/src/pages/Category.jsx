import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import "../App.css";
import useFetchCategories from "../context/useFetchCategories";
import useFetchArticles from "../context/useFetchArticles";
import useFetchAvatars from "../context/useFetchAvatar.js";
import PostComponent from "../components/Post";
import Footer from "../components/Footer";

const SelectedCategoryAllPost = () => {
  const apiUrl = import.meta.env.VITE_BACKEND_BASE_URL;
  const { category } = useParams();
  const { categories, loading } = useFetchCategories();
  const { articles, loading: articlesLoading } = useFetchArticles(
    `${apiUrl}/articles`
  );
  const [authorNames, setAuthorNames] = useState([]);
  const avatars = useFetchAvatars(authorNames);
  const uniqueId = uuidv4();


  // State to store the last path segment and selected category data
  const [categoryName, setCategoryName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState({});

  // // Get the current path location and set the last path segment
  useEffect(() => {
    const oneSegment = category;
    const firstLetterToUpperCase =
      oneSegment.charAt(0).toUpperCase() + oneSegment.slice(1);
    setCategoryName(firstLetterToUpperCase);
  }, [category]);

  // Memoized filtered articles based on the selected category
  const sameCategory = useMemo(() => {
    if (!categoryName || articlesLoading || loading) {
      return [];
    }
    if (!categoryName) {
      return [];
    }
    // // Get the articles and categories data
    
    const categoriesData = categories;

    // Find the selected category from categoriesData
    const category = categoriesData.find((item) => item.name === categoryName);
    setSelectedCategory(category);

    
    // Filter articles based on the category parameter
    const selectedArticles = articles.filter((article) =>
      article.categories.some((category) => category.name === categoryName)
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
  }, [articlesLoading, loading, articles, categories, categoryName]);

  return (
    <>
      <div className="py-5 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <span>Category</span>
              <h3>{categoryName}</h3>
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
            <div className="row" key={uniqueId}>
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
                    key={index}
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
