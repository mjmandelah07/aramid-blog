import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./admin/Login";
import Dashboard from "./admin/Dashboard";
import Category from "./pages/Category";
import MainLayout from "./layouts/MainLayout";
import SinglePage from "./pages/SinglePage";
import NoPage from "./pages/NoPage";
import CreateCategory from "./admin/CreateCategory";
import RequireAuth from "./components/RequireAuth";
import CreateArticle from "./admin/CreateArticle";
import AllPosts from "./admin/AllPosts";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="container-fluid">
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="category/:category" element={<Category />} />
              <Route path="post/:id" element={<SinglePage />} />
              <Route path="post/:id/:category" element={<Category />} />
              <Route path="*" element={<NoPage />} />
            </Route>
            <Route path="dashboard" element={<RequireAuth />}>
              <Route index element={<Dashboard />} />
              <Route path="categories" element={<CreateCategory />} />
              <Route path="create-post" element={<CreateArticle />} />
              <Route path="posts" element={<AllPosts />} />
            </Route>

            <Route path="login" element={<Login />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
