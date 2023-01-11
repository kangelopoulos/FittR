import React from "react";
import { useState } from "react";
import Message from "../components/Message.jsx";
import axios from "axios";
import { useNavigate } from "react-router";
const Register = ({ setUser }) => {
  // Hooks for form
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Hooks for error messaging
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword || !displayName) {
      console.log("here");
      setMsg("Please fill out all fields.");
    } else if (confirmPassword !== password) {
      setMsg("Passwords must match");
    } else {
      try {
        const response = await axios.post("https://api-fittr.onrender.com/auth/signup", {
          email: email,
          password: password,
          confirmPassword: confirmPassword,
          displayName: displayName,
        });
        if (response.status === 200) {
          setUser(response.data);
          navigate("/home");
        }
        setMsg("");
      } catch (err) {
        setMsg("There was an error on sign up, please try again.");
      }
    }
  };

  return (
    <div className="mid col auth">
      <h2>Welcome to FittR!</h2>
      <form id="register" className="col auth-form">
        <label htmlFor="email">Email</label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
          name="email"
          id="email"
        />
        <label htmlFor="name">Display Name</label>
        <input
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="Display Name"
          type="text"
          name="name"
          id="name"
        />
        <label htmlFor="password">Password</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          name="password"
          id="password"
        />
        <label htmlFor="confirm">Confirm Password</label>
        <input
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          type="password"
          name="confirm"
          id="confirm"
        />
      </form>
      <button onClick={handleSubmit} type="submit">
        Submit
      </button>
      <Message message={msg} />
    </div>
  );
};

export default Register;
