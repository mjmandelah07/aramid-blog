import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "../styles/admin.css";
import "../index.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError(""); // Clear error when user starts typing
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError(""); // Clear error when user starts typing
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      if (!validateEmail(value)) {
        setEmailError("Please enter a valid email address.");
      }
    } else if (name === "password") {
      if (!validatePassword(value)) {
        setPasswordError("Password must be at least 8 characters long.");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateEmail(email) && validatePassword(password)) {
      try {
        const response = await fetch(
          "https://aramid-blog.onrender.com/api/auth/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          }
        );

        const data = await response.json();

        if (response.ok) {
          // Clear error messages on successful login
          setEmailError("");
          setPasswordError("");
          setLoginError("");
          setPassword("");
          setEmail("");

          // Check if there's a token in the response
          if (data.token) {
            // Store the token in  cookies
            const expirationTime = Date.now() + 20 * 60 * 1000; // Current time + 20 minutes
            const token = data.token;
            Cookies.set("token", token);
            Cookies.set("tokenExpiration", expirationTime);
            navigate("/dashboard");
            alert(data.message);
          }
        } else {
          setLoginError(data.message);
          console.log(loginError);
        }
      } catch (error) {
        console.error("Error during login:", error);
      }
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <>
      <main>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-5">
              <div className="card shadow-lg border-0 rounded-3 mt-5">
                <div className="card-header">
                  <h3 className="text-center fw-light my-4 text-primary">
                    Login
                  </h3>
                </div>
                <div className="card-body">
                  <form
                    className="needs-validation"
                    onSubmit={handleSubmit}
                    noValidate
                  >
                    <div className="form-floating mb-3 ">
                      <input
                        type="email"
                        name="email"
                        className={`form-control rounded-2 ${
                          emailError ? "is-invalid" : ""
                        }`}
                        id="floatingInput"
                        placeholder="name@example.com"
                        value={email}
                        onChange={handleEmailChange}
                        onBlur={handleBlur}
                        required
                      />
                      <label htmlFor="floatingInput">Email address</label>
                      {emailError && (
                        <div className="invalid-feedback">{emailError}</div>
                      )}
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        type="password"
                        name="password"
                        className={`form-control rounded-2 ${
                          passwordError ? "is-invalid" : ""
                        }`}
                        id="floatingPassword"
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordChange}
                        onBlur={handleBlur}
                        required
                      />
                      <label htmlFor="floatingPassword">Password</label>
                      {passwordError && (
                        <div className="invalid-feedback">{passwordError}</div>
                      )}
                    </div>
                    <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                      <Link className="small" to="#">
                        Forgot Password?
                      </Link>
                      <button type="submit" className="btn btn-primary">
                        Login
                      </button>
                    </div>
                    {loginError && (
                      <div className="text-danger mt-3">{loginError}</div>
                    )}
                  </form>
                </div>
                <div className="card-footer text-body-secondary text-center bg-light">
                  <p>
                    Copyright © {currentYear} &nbsp; All rights reserved | This
                    blog is made with{" "}
                    <i
                      className="bi bi-heart-fill text-danger"
                      aria-hidden="true"
                    ></i>{" "}
                    by{" "}
                    <a
                      href="https://mojisola-aramide-portfolio.netlify.app"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Aramid
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Login;
