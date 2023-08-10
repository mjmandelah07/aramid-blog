import { Link, Outlet } from "react-router-dom";
import useFetchArticles from "../context/useFetchArticles";

const CountCategory = () => {
  const { articles } = useFetchArticles(
    "https://aramid-blog.onrender.com/api/articles"
  );

  const categoryCounts = {};

  // Loop through the articles and count them for each category
  articles.forEach((article) => {
    article.categories.forEach((category) => {
      const { name } = category;
      categoryCounts[name] = (categoryCounts[name] || 0) + 1;
    });
  });

  // Render the category counts
  return (
    <>
      <div className="sidebar-box">
        <h3 className="heading">Categories</h3>
        <ul className="categories">
          {Object.entries(categoryCounts).map(([category, count]) => (
            <li key={category}>
              <Link to={`/post/id/${category}`}>
                {category} <span>({count})</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <Outlet />
    </>
  );
};

export default CountCategory;
