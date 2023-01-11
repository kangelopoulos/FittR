import React, { useState, useEffect } from "react";
import Message from "../components/Message.jsx";
import axios from "axios";
import { Navigate } from "react-router";

const Login = ({ user, setUser, hasSession, setHasSession }) => {
  // Hooks for login form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Hooks for error messaging
  const [msg, setMsg] = useState("");

  /**
   * Authorization - once the app loads, it checks for a valid jwt
   */
   useEffect(() => {
    console.log('here');
    const checkSession = async () => {
      const response = await axios.get("https://api-fittr.onrender.com/auth/cookie", {
        withCredentials: true,
      });
      if (response.status === 200 && response.data) {
        setUser(response.data);
        setHasSession(true);
      }
    };
    checkSession();
  }, []);

  // Handle login attempt
  const handleLogin = async (e) => {
    console.log(email, password);
    e.preventDefault();
    if (!email || !password) {
      setMsg("Email and password required.");
    } else {
      try {
        const response = await axios.post("https://api-fittr.onrender.com/auth/login", {
          email: email,
          password: password,
        });
        const user = response.data;
        setUser(user);
        setHasSession(true);
      } catch (err) {
        if (err.status === 404) {
          setMsg("Wrong email or password.");
        }
      }
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="mid col auth">
      <h2>Welcome back!</h2>
      <form className="col">
        <label htmlFor="email">Email</label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="text"
          name="email"
          id="email"
          value={email}
        />
        <label htmlFor="password">Password</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="text"
          name="password"
          id="password"
          value={password}
        />
      </form>
      <button onClick={handleLogin} type="submit">
        Login
      </button>
      <Message message={msg} />
      {hasSession && <Navigate to="/home" replace={true} />}
    </div>
  );
};

export default Login;
