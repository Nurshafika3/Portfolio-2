import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Skills.css";

// Mock data as fallback
const mockSkills = {
  frontend: [
    { name: "React.js", level: 90, icon: "fab fa-react" },
    { name: "JavaScript", level: 85, icon: "fab fa-js-square" },
    { name: "HTML5", level: 95, icon: "fab fa-html5" },
    { name: "CSS3", level: 90, icon: "fab fa-css3-alt" },
    { name: "TypeScript", level: 80, icon: "fab fa-js-square" },
    { name: "Vue.js", level: 75, icon: "fab fa-vuejs" },
  ],
  backend: [
    { name: "Node.js", level: 85, icon: "fab fa-node-js" },
    { name: "Express.js", level: 80, icon: "fas fa-server" },
    { name: "Python", level: 75, icon: "fab fa-python" },
    { name: "MongoDB", level: 70, icon: "fas fa-database" },
    { name: "PostgreSQL", level: 65, icon: "fas fa-database" },
    { name: "REST APIs", level: 85, icon: "fas fa-code" },
  ],
  tools: [
    { name: "Git", level: 90, icon: "fab fa-git-alt" },
    { name: "VS Code", level: 95, icon: "fas fa-code" },
    { name: "Docker", level: 70, icon: "fab fa-docker" },
    { name: "AWS", level: 65, icon: "fab fa-aws" },
    { name: "Figma", level: 75, icon: "fab fa-figma" },
    { name: "Postman", level: 80, icon: "fas fa-code" },
  ],
};

const Skills = () => {
  const [skills, setSkills] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/skills");
      setSkills(response.data);
    } catch (err) {
      console.log("API not available, using mock data");
      setSkills(mockSkills);
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="skills">
        <div className="container">
          <div className="loading">Loading skills...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="skills">
        <div className="container">
          <div className="error">{error}</div>
        </div>
      </section>
    );
  }

  const SkillBar = ({ skill }) => (
    <div className="skill-item">
      <div className="skill-header">
        <span className="skill-name">
          <i className={skill.icon}></i>
          {skill.name}
        </span>
        <span className="skill-percentage">{skill.level}%</span>
      </div>
      <div className="skill-bar">
        <div
          className="skill-progress"
          style={{ width: `${skill.level}%` }}
        ></div>
      </div>
    </div>
  );

  return (
    <section className="skills">
      <div className="container">
        <div className="skills-header">
          <h1 className="section-title">My Skills</h1>
          <p className="section-subtitle">Technologies and tools I work with</p>
        </div>

        <div className="skills-content">
          {Object.entries(skills).map(([category, skillList]) => (
            <div key={category} className="skills-category">
              <h2 className="category-title">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </h2>
              <div className="skills-list">
                {skillList.map((skill, index) => (
                  <SkillBar key={index} skill={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="skills-summary">
          <div className="summary-card">
            <h3>Frontend Development</h3>
            <p>
              I specialize in creating responsive, interactive user interfaces
              using modern frameworks like React and Vue.js, ensuring great user
              experiences.
            </p>
          </div>
          <div className="summary-card">
            <h3>Backend Development</h3>
            <p>
              I build robust server-side applications with Node.js and Express,
              creating RESTful APIs and handling database operations
              efficiently.
            </p>
          </div>
          <div className="summary-card">
            <h3>Development Tools</h3>
            <p>
              I use industry-standard tools for version control, deployment, and
              project management to ensure smooth development workflows.
            </p>
          </div>
        </div>

        <div className="learning-section">
          <h2>Currently Learning</h2>
          <div className="learning-items">
            <div className="learning-item">
              <i className="fab fa-react"></i>
              <span>Next.js</span>
            </div>
            <div className="learning-item">
              <i className="fas fa-cloud"></i>
              <span>GraphQL</span>
            </div>
            <div className="learning-item">
              <i className="fab fa-docker"></i>
              <span>Kubernetes</span>
            </div>
            <div className="learning-item">
              <i className="fas fa-mobile-alt"></i>
              <span>React Native</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
