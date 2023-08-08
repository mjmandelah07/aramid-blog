import { Link, Outlet} from 'react-router-dom'
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
<>
    <div className="site-footer">
      <div className="container">
        <div className="row mb-5">
          <div className="col-md-4">
            <h3 className="footer-heading mb-4">About Us</h3>
            <p>
              Discover a diverse blog covering entertainment, politics, tech,
              and sports. Stay informed and entertained with engaging, accurate,
              and thought-provoking content from our passionate team of writers.
              Join us now!
            </p>
          </div>
          <div className="col-md-3 ms-auto">
            <ul className="list-group float-start me-5">
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Advertise</a>
              </li>
              <li>
                <a href="#">Careers</a>
              </li>
              <li>
                <a href="#subcribe">Subscribes</a>
              </li>
            </ul>
            <ul className="list-group float-start">
              <li>
                <Link to="/travel">Travel</Link>
              </li>
              <li>
                <Link
            to="/lifestyle">Lifestyle</Link>
              </li>
              <li>
                <Link
              to="/sports">Sports</Link>
              </li>
              <li>
                <Link
              to="/nature">Nature</Link>
              </li>
            </ul>
          </div>
          <div className="col-md-4" id='contact'>
            <div>
              <h3 className="footer-heading mb-4">Connect With Us</h3>
              <p>
                <a href="https://www.facebook.com/profile.php?id=100004530948970">
                  <span className="pt-2 pe-2 pb-2 ps-0">
                    <i className="bi bi-facebook"></i>
                  </span>
                </a>
                <a href="https://twitter.com/mjmandelah">
                  <span className="p-2">
                    <i className="bi bi-twitter"></i>
                  </span>
                </a>
                <a href="https://www.instagram.com/mj_mandelah">
                  <span className="p-2">
                    <i className="bi bi-instagram"></i>
                  </span>
                </a>
                <a href="https://www.linkedin.com/in/mojisola-aramide/">
                  <span className="p-2">
                    <i className="bi bi-linkedin"></i>
                  </span>
                </a>
                <a href="https://github.com/mjmandelah07">
                  <span className="p-2">
                    <i className="bi bi-github"></i>
                  </span>
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 text-center">
            <p>
              Copyright © {currentYear} &nbsp;
              All rights reserved | This blog is made with{" "}
              <i
                className="bi bi-heart-fill text-danger" aria-hidden="true"
              ></i> by{" "}
              <a href="https://mojisola-aramide-portfolio.netlify.app" target="_blank" rel="noreferrer">
                Aramid
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>

   <Outlet />
    </>
  );
};



export default Footer;
