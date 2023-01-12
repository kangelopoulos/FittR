import React from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav.jsx";
import Login from "./containers/Login.jsx";
import Home from "./containers/Home.jsx";
import Register from "./containers/Register.jsx";
import "./styles/main.scss";
import { useState } from "react";

const App = () => {
  // Hooks for user session
  const [hasSession, setHasSession] = useState(false);
  const [user, setUser] = useState({});

  return (
    <div id="main">
      <Nav
        hasSession={hasSession}
        setHasSession={setHasSession}
        setUser={setUser}
      />
      <Routes>
        <Route path="/home" element={<Home user={user} />} />
        <Route
          path="/"
          element={
            <Login
              setUser={setUser}
              hasSession={hasSession}
              setHasSession={setHasSession}
            />
          }
        />
        <Route
          path="/register"
          element={<Register setUser={setUser} 
          setHasSession={setHasSession}
        />
        }
        ></Route>
      </Routes>
    </div>
  );
};

export default App;
