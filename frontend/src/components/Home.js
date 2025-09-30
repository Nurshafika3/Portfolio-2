import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  return (
    <section className="home">
      <div className="home-container">
        <div className="home-content">
          <div className="home-text">
            <h1 className="home-title">
              Hi, I'm Nurshafika Binti Mohamad Nizam
            </h1>
            <h2 className="home-subtitle">Junior Software Engineer</h2>
            <p className="home-description">
              I create modern, responsive web applications using React, Node.js,
              and other cutting-edge technologies. Let's build something amazing
              together.
            </p>
            <div className="home-buttons">
              <Link to="/projects" className="btn btn-primary">
                View My Work
              </Link>
              <Link to="/contact" className="btn btn-secondary">
                Get In Touch
              </Link>
            </div>
            <div className="social-links">
              <a
                href="https://github.com/Nurshafika3"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-github"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/nurshafika-nizam-4a572a21b"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
          <div className="home-image">
            <div className="image-placeholder">
              <i className="fas fa-user-circle"></i>
            </div>
          </div>
        </div>

        <div className="scroll-indicator">
          <div className="scroll-down">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
