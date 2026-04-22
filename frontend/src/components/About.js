import React from "react";
import { Link } from "react-router-dom";
import "../styles/About.css";

const About = () => {
  const featuredBlocks = [
    {
      title: "Featured Work",
      description:
        "Production-ready full stack builds with clean UI systems and practical backend architecture.",
      action: "See projects",
      link: "/projects",
      tone: "work",
    },
    {
      title: "Skill Stack",
      description:
        "React, Node.js, Express, and modern frontend tooling focused on performance and usability.",
      action: "View skills",
      link: "/skills",
      tone: "gallery",
    },
  ];

  return (
    <section className="about">
      <div className="about-glow about-glow-left"></div>
      <div className="about-glow about-glow-right"></div>

      <div className="container">
        <div className="about-hero">
          <div className="about-pill-group">
            <span className="about-pill about-pill-strong">Portfolio</span>
            <span className="about-pill">Nurshafika</span>
          </div>

          <h1 className="about-title">Shafika · Dev & Design</h1>

          <p className="about-lead">
           Beginner coder. Big enthusiasm. I focus on clarity, performance, and making products people actually enjoy while learning as I go.
          </p>

          <Link className="about-profile" to="/about" aria-label="Open about page">
            <span className="about-avatar">NS</span>
            <span className="about-profile-text">About Me</span>
          </Link>

          <div className="about-feature-grid">
            {featuredBlocks.map((block) => (
              <article key={block.title} className={`about-feature-card ${block.tone}`}>
                <h3>{block.title}</h3>
                <p>{block.description}</p>
                <Link to={block.link}>{block.action}</Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;