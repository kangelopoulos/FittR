import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav.jsx";
import Login from "./containers/Login.jsx";
import Home from "./containers/Home.jsx";
import Register from "./containers/Register.jsx";
import "./styles/main.scss";
import { useState } from "react";
import axios from "axios";

const App = () => {
  // Hooks for user session
  const [hasSession, setHasSession] = useState(false);
  const [user, setUser] = useState({});
  console.log(user);
  /**
   * Authorization - once the app loads, it checks for a valid jwt
   */
  useEffect(() => {
    // const checkSession = async () => {
    //   const response = await axios.get("/auth/cookie", {
    //     withCredentials: true,
    //   });
    //   if (response.status === 200 && response.data) {
    //     setUser(response.data);
    //     setHasSession(true);
    //   }
    // };
    // checkSession();
  }, []);

  return (
    <div id="main">
      <Nav
        hasSession={hasSession}
        setHasSession={setHasSession}
        setUser={setUser}
      />
      <Routes>
        <Route path="/home" element={<Home user={user} />}></Route>
        <Route
          path="/"
          element={
            <Login
              setUser={setUser}
              hasSession={hasSession}
              setHasSession={setHasSession}
            />
          }
        ></Route>
        <Route
          path="/register"
          element={<Register setUser={setUser} hasSession={hasSession} />}
        ></Route>
      </Routes>
    </div>
  );
};

export default App;
