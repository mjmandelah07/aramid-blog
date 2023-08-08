import { Link, Outlet } from "react-router-dom";
import "../index.css";
import "../App.css";
import PropTypes from 'prop-types'

const AdminHeader = ({ logout }) => {
  return (
    <>
      <nav className="navbar navbar-expand-lg container">
        <div className="container-fluid py-2 px-3">
          <div className="dropdown py-sm-4 mt-sm-auto  ms-sm-0 flex-shrink-1">
            <Link
              to="#"
              className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
              id="dropdownUser1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src="https://github.com/mdo.png"
                alt="hugenerd"
                width="50"
                height="50"
                className="rounded-circle"
              />
              <span className="d-none d-sm-inline mx-1 text-dark">
               
                  Aramid
               
              </span>
            </Link>

            <ul
              className="dropdown-menu dropdown-menu-lg-start text-center dropdown-menu-dark text-small shadow"
              aria-labelledby="dropdownUser1"
            >
              <li>
                <Link to="#" className="dropdown-item">
                  New post
                </Link>
              </li>
              <li>
                <Link to="#" className="dropdown-item">
                  Settings
                </Link>
              </li>
              <li>
                <Link to="#" className="dropdown-item">
                  Profile
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
              <button onClick={logout} className="btn btn-primary">Sign out</button>
              </li>
            </ul>
          </div>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav align-items-center">
              <Link className="nav-link" aria-current="page" to="/dashboard">
                Home
              </Link>
              <Link className="nav-link" to="/dashboard/create-post">
                New Post
              </Link>
              <Link className="nav-link" to="/dashboard/categories">
                Categories
              </Link>
              <Link className="nav-link" to="/dashboard/posts">
                All Posts
              </Link>
              <Link className="nav-link" to="#">
                Settings
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <Outlet />
    </>
  );
};

AdminHeader.propTypes = {
  logout: PropTypes.func
}

export default AdminHeader;
