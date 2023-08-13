import { Link } from "react-router-dom";
import useFetchCategories from "../context/useFetchCategories";
import "../index.css";
import "../App.css";

export default function AllCategoriesDropDown() {
  const { categories, loading } = useFetchCategories();
  
  
  return (
    <li className="nav-item dropdown">
      <a
        className="nav-link dropdown-toggle"
        href="#"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Categories
      </a>
      <ul className="dropdown-menu">
        {loading ? (
          <p>Loading categories...</p>
        ) : (
          categories.map((category) => (
            <li key={category._id}>
              <Link
                to={`/category/${category.name}`}
                className={`dropdown-item bg-${category.color}`}
        
              >
                {category.name}
              </Link>
            </li>
          ))
        )}
      </ul>
    </li>
  );
}
