// Import the JSON data directly
import { Link, Outlet } from "react-router-dom";
import useFetchArticles from "../context/useFetchArticles";


const CountCategory = () => {
  // // get the path location of the category
  // const location = useLocation();
  // const pathSegments = location.pathname.split("/");
  // const lastPathSegment = pathSegments[pathSegments.length - 1];

  const { articles } = useFetchArticles(
    "http://localhost:5000/api/articles"
  );
  // Process the JSON data to count articles in each category
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
