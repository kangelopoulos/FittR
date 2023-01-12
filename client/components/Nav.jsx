import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Nav = ({ hasSession, setHasSession, setUser }) => {
  const navigate = useNavigate();

  /**
   * Requests that the server remove any existing jwt, reroutes to login
   */
  const handleLogout = async () => {
    setUser({});
    setHasSession(false);
    const response = await axios.delete(
      "https://api-fittr.onrender.com/auth/cookie",
      {
        withCredentials: true,
      }
    );
    navigate("/");
  };

  return (
    <nav>
      <h1>FittR</h1>
      <div className="links">
        {hasSession ? (
          <a onClick={handleLogout} className="nav-link">
            Logout
          </a>
        ) : (
          <>
            <Link to="/" className="nav-link">
              Login
            </Link>
            <Link to="/register" className="nav-link">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
