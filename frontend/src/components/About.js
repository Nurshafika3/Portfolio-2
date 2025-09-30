import React from "react";
import "../styles/About.css";

const About = () => {
  return (
    <section className="about">
      <div className="container">
        <div className="about-header">
          <h1 className="section-title">About Me</h1>
          <p className="section-subtitle">
            Get to know more about who I am and what I do
          </p>
        </div>

        <div className="about-content">
          <div className="about-image">
            <div className="image-placeholder">
              <i className="fas fa-user"></i>
            </div>
          </div>

          <div className="about-text">
            <h2>Hello! I'm a Junior Software Engineer</h2>
            <p>
              I'm passionate about creating digital experiences that make a
              difference. With expertise in both frontend and backend
              technologies, I enjoy building complete web applications from
              concept to deployment.
            </p>
            <p>
              My journey in web development started two years ago, and since
              then I've worked on various projects ranging from small business
              websites to large-scale applications. I'm always eager to learn
              new technologies and take on challenging projects.
            </p>

            <div className="about-stats">
              <div className="stat">
                <h3>2+</h3>
                <p>Projects Completed</p>
              </div>
              <div className="stat">
                <h3>1+</h3>
                <p>Years Experience</p>
              </div>
            </div>

            <div className="about-interests">
              <h3>When I'm not coding, I enjoy:</h3>
              <ul>
                <li>
                  <i className="fas fa-book"></i> Reading tech blogs and
                  documentation
                </li>
                <li>
                  <i className="fas fa-music"></i> Listening to music and
                  podcasts
                </li>
                <li>
                  <i className="fas fa-hiking"></i> Outdoor activities and
                  hiking
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="about-timeline">
          <h2>My Journey</h2>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-date">2025</div>
              <div className="timeline-content">
                <h3>Junior Software Developer</h3>
                <p>
                  Keep learning as a junior developer.
                </p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-date">2024</div>
              <div className="timeline-content">
                <h3>Junior Software Developer</h3>
                <p>
                  Developed and maintained multiple client projects using React
                  and Node.js when internship 
                </p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-date">2023</div>
              <div className="timeline-content">
                <h3>Frontend Developer</h3>
                <p>
                  Specialized in creating responsive and interactive user
                  interfaces.
                </p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-date">2023</div>
              <div className="timeline-content">
                <h3>Started Web Development Journey</h3>
                <p>
                  Began learning web development and built my first projects.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
