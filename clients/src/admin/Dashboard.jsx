import AdminHeader from "../components/AdminHeader";
import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import '../App.css'
import '../index.css'
import '../styles/admin.css'

const Dashboard = () => {
  const navigate = useNavigate();
  const tokenExpiration = Cookies.get("tokenExpiration");

  useEffect(() => {
    // Check if tokenExpiration is set in cookies
    if (tokenExpiration) {
      const currentTime = Date.now();
      const expirationTime = parseInt(tokenExpiration);

      // Compare current time with token expiration time
      if (currentTime >= expirationTime) {
        // Token has expired, redirect to login
        navigate("/login");
        // alert user to login
        alert("Your session has expired, please log in now");
      }
    } else {
      // Token expiration not found, redirect to login
      navigate("/login");
    }
  }, [tokenExpiration, navigate]);

  // handle log out events
  const handleLogout = () => {
    // Clear the authentication token from cookies
    Cookies.remove("token");
    Cookies.remove("tokenExpiration");

    // Navigate back to the login page
    navigate("/login");
  };
  return (
    <>
    <div className="bg-primary vh-100">
      <AdminHeader logout={handleLogout} />
      <h1 className="text-center mt-5">Welcome to dashboard</h1>
      </div>

      <Outlet/>
    </>
  );
};

export default Dashboard;
