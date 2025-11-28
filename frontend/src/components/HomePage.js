// src/pages/HomePage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import BackgroundImage from "../assets/bg.jpg";
import '../App.css';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="home-container"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      <div className="overlay">
        <h1>Welcome to Chatify</h1>
        <p>Connect with friends and family instantly. Enjoy seamless chatting experience.</p>
        <div className="buttons">
          <button
            onClick={() => navigate("/login")}
            className="get-started-btn"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
