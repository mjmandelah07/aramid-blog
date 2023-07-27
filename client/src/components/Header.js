import { Link, Outlet } from "react-router-dom";

/* eslint-disable jsx-a11y/anchor-is-valid */

const Header = () => {
  return (
    <>
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid py-2 px-3">
        <Link className="navbar-brand text-black fs-5 mb-0 site-logo " to="#">
          Aramid blog
        </Link>
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
            <Link className="nav-link" aria-current="page" to="home">
              Home
            </Link>
            <Link className="nav-link" to="tech">
            Tech
            </Link>
            <Link className="nav-link" to="politics">
              Politics
              
            </Link>
            <Link className="nav-link" to="travel">Travel</Link>
            <Link className="nav-link " to="sport"> Sports</Link>
            <Link className="nav-link " to="entertainment">Entertainment</Link>
            <Link className="nav-link login" to="login">
              <button type="button" className="btn btn-primary">Login</button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
    <Outlet />
    </>
  );
};

export default Header;
