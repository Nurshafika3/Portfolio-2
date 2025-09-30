import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Projects.css";

// Mock data as fallback
const mockProjects = [
  {
    id: 1,
    title: "E-Commerce Website",
    description:
      "A full-stack e-commerce application built with React and Node.js",
    technologies: ["React", "Node.js", "MongoDB", "Express"],
    githubUrl: "https://github.com/yourusername/ecommerce-app",
    liveUrl: "https://your-ecommerce-app.com",
    imageUrl: "/images/project1.jpg",
    featured: true,
  },
  {
    id: 2,
    title: "hiNutrition: AR Guide to Diseases for Kids App",
    description:
      "HiNutrition is an AR-based app that helps children learn about nutrition and diseases through 3D visuals and interactive quizzes. It features engaging design, 2D booklet images, and AR-enhanced 3D models to make learning fun and educational under parental guidance.",
    technologies: ["React", "Socket.io", "Node.js", "PostgreSQL"],
    githubUrl: "https://github.com/Nurshafika3/hiNutrition-Mobile-Apps",
    imageUrl: "/images/project2.jpg",
    featured: true,
  },
  {
    id: 3,
    title: "hiHealth Mobile Application",
    description:
      "HiHealth is a comprehensive mobile health application built with Ionic Angular that provides users with detailed information about common diseases and health conditions. This application serves as a digital health companion, offering symptoms, causes, treatments, and preventive measures for various medical conditions.",
    technologies: ["JavaScript", "HTML5", "CSS3", "Weather API"],
    githubUrl: "https://github.com/Nurshafika3/HiHealth",
    imageUrl: "/images/project3.jpg",
    featured: false,
  },
];

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/projects");
      setProjects(response.data);
    } catch (err) {
      console.log("API not available, using mock data");
      setProjects(mockProjects);
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = projects.filter((project) => {
    if (filter === "all") return true;
    if (filter === "featured") return project.featured;
    return project.technologies.some((tech) =>
      tech.toLowerCase().includes(filter.toLowerCase())
    );
  });

  if (loading) {
    return (
      <section className="projects">
        <div className="container">
          <div className="loading">Loading projects...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="projects">
        <div className="container">
          <div className="error">{error}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="projects">
      <div className="container">
        <div className="projects-header">
          <h1 className="section-title">My Projects</h1>
          <p className="section-subtitle">
            Here are some of the projects I've worked on
          </p>
        </div>

        <div className="projects-filter">
          <button
            className={filter === "all" ? "active" : ""}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={filter === "featured" ? "active" : ""}
            onClick={() => setFilter("featured")}
          >
            Featured
          </button>
          <button
            className={filter === "react" ? "active" : ""}
            onClick={() => setFilter("react")}
          >
            React
          </button>
          <button
            className={filter === "node" ? "active" : ""}
            onClick={() => setFilter("node")}
          >
            Node.js
          </button>
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-image">
                <img
                  src={project.imageUrl || "/placeholder-project.jpg"}
                  alt={project.title}
                  onError={(e) => {
                    e.target.src =
                      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y1ZjVmNSIvPgogIDx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTRweCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBhdmFpbGFibGU8L3RleHQ+Cjwvc3ZnPg==";
                  }}
                />
                <div className="project-overlay">
                  <div className="project-links">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                      >
                        <i className="fab fa-github"></i>
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                      >
                        <i className="fas fa-external-link-alt"></i>
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>

                <div className="project-technologies">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="no-projects">
            <p>No projects found for the selected filter.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
