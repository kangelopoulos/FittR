import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Nav = ({ hasSession, setHasSession, setUser }) => {
  const handleLogout = async () => {
    setUser({});
    const response = await axios.delete("https://api-fittr.onrender.com/auth/cookie", {
      withCredentials: true,
    });
    console.log(response);
    setHasSession(false);
  };

  return (
    <nav>
      <h1>FittR</h1>
      <div className="links">
        {hasSession ? (
          <Link onClick={handleLogout} to="/" className="nav-link">
            Logout
          </Link>
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
