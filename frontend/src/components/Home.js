import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  const [activeId, setActiveId] = useState("introduction");
  const observerRef = useRef(null);

  const profile = {
    name: "Nurshafika Binti Mohamad Nizam",
    role: "Junior Software Engineer",
    location: "Kuala Lumpur, Malaysia",
    intro:
      "I create modern, responsive web applications using React, Node.js, and practical engineering patterns. I enjoy turning ideas into clean, usable products while continuously improving my craft.",
    languages: ["English", "Bahasa Melayu"],
  };

  const socialLinks = [
    {
      name: "GitHub",
      link: "https://github.com/Nurshafika3",
      icon: "fab fa-github",
      essential: true,
    },
    {
      name: "LinkedIn",
      link: "https://www.linkedin.com/in/nurshafika-nizam-4a572a21b",
      icon: "fab fa-linkedin",
      essential: true,
    },
  ];

  const workExperiences = [
    {
      company: "Portfolio Projects",
      role: "Frontend & Full Stack Developer",
      timeframe: "2024 - Present",
      achievements: [
        "Built responsive React interfaces with reusable components and clear navigation.",
        "Integrated Node.js and Express APIs for contact forms and project data management.",
        "Improved UI consistency through modular CSS and component-based design patterns.",
      ],
    },
  ];

  const studies = [
    {
      institution: "Software Engineering Learning Path",
      description:
        "Hands-on development in React, JavaScript, and backend fundamentals through practical projects.",
    },
  ];

  const technicalSkills = [
    {
      title: "Frontend Development",
      description:
        "Building responsive and accessible interfaces with React, routing, and modern component architecture.",
      tags: ["React", "JavaScript", "CSS3", "HTML5"],
    },
    {
      title: "Backend Development",
      description:
        "Creating REST APIs with Node.js and Express, including routing and server-side integrations.",
      tags: ["Node.js", "Express", "REST API"],
    },
  ];

  const toId = (value) =>
    value
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");

  const structure = [
    { title: "Introduction", items: [] },
    { title: "Work", items: workExperiences.map((item) => item.company) },
    { title: "Studies", items: studies.map((item) => item.institution) },
    { title: "Technical Skills", items: technicalSkills.map((item) => item.title) },
  ];

  // Collect all section IDs to observe
  const allSectionIds = [
    "introduction",
    ...structure.flatMap((s) => [
      toId(s.title),
      ...s.items.map((item) => toId(item)),
    ]),
  ].filter((id, index, arr) => arr.indexOf(id) === index);

  useEffect(() => {
    // IntersectionObserver — detect which section is in view
    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Find the topmost visible section
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -60% 0px", // trigger when section is ~20% from top
        threshold: 0,
      }
    );

    // Observe all section elements
    allSectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  useEffect(() => {
    // Slide-in animation for sections using IntersectionObserver
    const slideObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("section-visible");
            slideObserver.unobserve(entry.target); // animate once
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".about-section, .about-intro").forEach((el) => {
      slideObserver.observe(el);
    });

    return () => slideObserver.disconnect();
  }, []);

  const handleTocClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveId(id);
    }
  };

  return (
    <section className="home about-home">
      <div className="home-container about-home-container">
        <aside className="about-toc" aria-label="About sections">
          <h3>Contents</h3>
          <ul>
            {structure.map((section) => (
              <li key={section.title}>
                <a
                  href={`#${toId(section.title)}`}
                  className={activeId === toId(section.title) ? "toc-active" : ""}
                  onClick={(e) => handleTocClick(e, toId(section.title))}
                >
                  {/* Sliding active indicator */}
                  <span className="toc-indicator" />
                  {section.title}
                </a>
                {section.items.length > 0 && (
                  <ul className="about-toc-sublist">
                    {section.items.map((item) => (
                      <li key={item}>
                        <a
                          href={`#${toId(item)}`}
                          className={activeId === toId(item) ? "toc-active" : ""}
                          onClick={(e) => handleTocClick(e, toId(item))}
                        >
                          <span className="toc-indicator" />
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </aside>

        <div className="about-main">
          <div className="home-content about-intro" id={toId("Introduction")}>
            <div className="home-text">
              <h1 className="home-title">{profile.name}</h1>
              <h2 className="home-subtitle">{profile.role}</h2>
              <p className="home-description">{profile.intro}</p>

              <div className="about-meta">
                <span className="about-location">Location: {profile.location}</span>
                <div className="about-language-tags">
                  {profile.languages.map((language) => (
                    <span key={language} className="about-tag">
                      {language}
                    </span>
                  ))}
                </div>
              </div>

              <div className="home-buttons">
                <Link to="/projects" className="btn btn-primary">
                  View My Work
                </Link>
                <Link to="/contact" className="btn btn-secondary">
                  Get In Touch
                </Link>
              </div>

              <div className="social-links">
                {socialLinks
                  .filter((item) => item.essential)
                  .map((item) => (
                    <a
                      key={item.name}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.name}
                      title={item.name}
                    >
                      <i className={item.icon}></i>
                    </a>
                  ))}
              </div>
            </div>
          </div>

          <section className="about-section" id={toId("Work")}>
            <h3 className="about-section-title">Work</h3>
            <div className="about-cards">
              {workExperiences.map((experience) => (
                <article key={experience.company} className="about-card">
                  <div className="about-card-heading">
                    <h4 id={toId(experience.company)}>{experience.company}</h4>
                    <span>{experience.timeframe}</span>
                  </div>
                  <p className="about-role">{experience.role}</p>
                  <ul>
                    {experience.achievements.map((achievement) => (
                      <li key={achievement}>{achievement}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="about-section" id={toId("Studies")}>
            <h3 className="about-section-title">Studies</h3>
            <div className="about-cards">
              {studies.map((study) => (
                <article key={study.institution} className="about-card">
                  <h4 id={toId(study.institution)}>{study.institution}</h4>
                  <p>{study.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="about-section" id={toId("Technical Skills")}>
            <h3 className="about-section-title">Technical Skills</h3>
            <div className="about-cards">
              {technicalSkills.map((skill) => (
                <article key={skill.title} className="about-card">
                  <h4 id={toId(skill.title)}>{skill.title}</h4>
                  <p>{skill.description}</p>
                  <div className="about-skill-tags">
                    {skill.tags.map((tag) => (
                      <span key={tag} className="about-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <div className="scroll-indicator">
            <div className="scroll-down" aria-hidden="true">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;