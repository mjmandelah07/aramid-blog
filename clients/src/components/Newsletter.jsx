const Newsletter = () => {
  return (
    <div className="site-section bg-white" id="subscribe">
      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-md-5">
            <div className="subscribe-1">
              <h2>Subscribe to our newsletter</h2>
              <p className="mb-5">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit
                nesciunt error illum a explicabo, ipsam nostrum.
              </p>
              <form action="#" className="d-flex">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your email address"
                />
                <button type="submit" className="btn btn-primary">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
