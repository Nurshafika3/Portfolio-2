import React, { useEffect, useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  const [activeId, setActiveId] = useState("introduction");
  const scrollPaneRef = useRef(null);
  const observerRef  = useRef(null);
  const isClickingRef = useRef(false); // suppress observer during programmatic scroll

  const profile = {
    name: "Nurshafika Binti Mohamad Nizam",
    role: "Junior Software Engineer",
    location: "Kuala Lumpur, Malaysia",
    intro:
      "I create modern, responsive web applications using React, Node.js, and practical engineering patterns. I enjoy turning ideas into clean, usable products while continuously improving my craft.",
    languages: ["English", "Bahasa Melayu"],
  };

  const socialLinks = [
    { name: "GitHub",   link: "https://github.com/Nurshafika3",                         icon: "fab fa-github",   essential: true },
    { name: "LinkedIn", link: "https://www.linkedin.com/in/nurshafika-nizam-4a572a21b", icon: "fab fa-linkedin", essential: true },
  ];

  const workExperiences = [
    {
      company: "Malaysia Blockchain Infrastructure (MBI)",
      role: "Research & Blockchain Developer [Contract]",
      timeframe: "January 2026 - Present",
      achievements: [
        "Built responsive React/Node.js/PostgreSQL apps with modular architecture.",
        "Wrote clean TypeScript code (ESLint/Prettier) with 95% unit test coverage to boost reliability.",
        "Optimized Node.js/PostgreSQL services using complex queries, indexing, and transactions to improve DB performance by 35%.",
        "Participated in full Agile SDLC (Git, Docker, Kubernetes), delivering 10+ on-time releases with 95% success and strong stability.",
        "Developed responsive interactive features with JavaScript, HTML, CSS, adhering to UI/UX standards.",
        "Integrated Zetrix blockchain for credit payment processing, implementing secure wallet connections and on‑chain transaction verification.",
      ],
    },
    {
      company: "OpenEDG",
      role: "Associate Web Developer [KYouth Programme]",
      timeframe: "September 2025 - January 2026",
      achievements: [
        "Built responsive React/Node.js/PostgreSQL applications with modular architecture and developed interactive features using JavaScript, HTML, and CSS while strictly adhering to UI/UX standards.",
        "Learned and applied best practices in frontend and backend development, including state management, API integration, and database design.",
      ],
    },
    {
      company: "BinaCloud Sdn Bhd",
      role: "Software Engineer [Internship]",
      timeframe: "February 2025 - August 2025",
      achievements: [
        "Maintained and improved web applications by debugging and resolving frontend issues, reducing page load time and enhancing user satisfaction.",
        "Collaborated with a 2-member development team to enhance UI/UX responsiveness using React.js, Ant Design (Antd), and Tailwind CSS, ensuring seamless performance across mobile and desktop.",
        "Designed and implemented UI/UX updates and new feature enhancements, resulting in a 15% increase in returning user engagement.",
        "Contributed to a scalable JavaScript/TypeScript codebase by following best practices, creating reusable components, and conducting peer code reviews that improved code quality.",
      ],
    },
  ];

  const studies = [
    {
      institution: "Bachelor of Information Technology (Hons) in Software Engineering, University of Kuala Lumpur (UniKL)",
      timeframe: "January 2022 - November 2025",
      description:
        "This course focuses on how to design, develop, and maintain software systems. I'm learning programming, system design, and how to build real-world applications like web and mobile apps. It also covers the full software development process and includes hands-on projects and internship experience.",
    },
    {
      institution: "Diploma in Computer Science, University Poly-Tech Malaysia (UPTM)",
      timeframe: "June 2019 - November 2021",
      description:
        "The course gave me a strong foundation in both theory and practical computing skills, including programming, databases, networking, and web development. I also learned how to use different tools and technologies, analyze technical information, and build simple software applications. It prepared me with problem-solving and communication skills, as well as real-world exposure through projects and industrial training.",
    },
  ];

  const technicalSkills = [
    {
      title: "Frontend Development",
      description: "Building responsive and accessible interfaces with React, routing, and modern component architecture.",
      tags: ["React", "JavaScript", "CSS3", "HTML5"],
    },
    {
      title: "Backend Development",
      description: "Creating REST APIs with Node.js and Express, including routing and server-side integrations.",
      tags: ["Node.js", "Express", "REST API"],
    },
  ];

  const toId = (value) =>
    value.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");

  const structure = [
    { title: "Introduction",    items: [] },
    { title: "Work",            items: workExperiences.map((w) => w.company) },
    { title: "Studies",         items: studies.map((s) => s.institution) },
    { title: "Technical Skills",items: technicalSkills.map((t) => t.title) },
  ];

  const allSectionIds = [
    "introduction",
    ...structure.flatMap((s) => [toId(s.title), ...s.items.map(toId)]),
  ].filter((id, i, arr) => arr.indexOf(id) === i);

  // ── Scroll inside the right pane using offsetTop (layout-stable)
  const scrollToId = useCallback((id) => {
  const pane = scrollPaneRef.current;
  const el   = document.getElementById(id);
  if (!pane || !el) return;

  const paneRect = pane.getBoundingClientRect();
  const elRect   = el.getBoundingClientRect();

  // Use requestAnimationFrame to read position AFTER any CSS transform settles
  requestAnimationFrame(() => {
    const paneRect2 = pane.getBoundingClientRect();
    const elRect2   = el.getBoundingClientRect();
    const targetScroll = elRect2.top - paneRect2.top + pane.scrollTop - 16;

    isClickingRef.current = true;
    pane.scrollTo({ top: targetScroll, behavior: "smooth" });
    setTimeout(() => { isClickingRef.current = false; }, 750);
  });
}, []);

  // ── IntersectionObserver scoped to the right pane ─────────────────────────
  useEffect(() => {
    const pane = scrollPaneRef.current;
    if (!pane) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (isClickingRef.current) return;

        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      {
        root: pane,                       // ← observe inside the pane, not window
        rootMargin: "-10% 0px -55% 0px",
        threshold: 0,
      }
    );

    allSectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  // ── Slide-in animation scoped to the right pane ───────────────────────────
  useEffect(() => {
    const pane = scrollPaneRef.current;
    if (!pane) return;

    const slideObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("section-visible");
            slideObserver.unobserve(entry.target);
          }
        });
      },
      { root: pane, threshold: 0.08 }
    );

    document.querySelectorAll(".about-section, .about-intro").forEach((el) => {
      slideObserver.observe(el);
    });

    return () => slideObserver.disconnect();
  }, []);

  // ── TOC click ─────────────────────────────────────────────────────────────
  const handleTocClick = (e, id) => {
    e.preventDefault();
    setActiveId(id);   // highlight immediately
    scrollToId(id);
  };

  return (
    /* about-layout fills the viewport below the navbar */
    <section className="home about-home">
      <div className="about-layout">

        {/* ── LEFT: completely static TOC ── */}
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

        {/* ── RIGHT: independently scrollable content pane ── */}
        <div className="about-scroll-pane" ref={scrollPaneRef}>
          <div className="about-main">

            {/* Introduction */}
            <div className="home-content about-intro" id={toId("Introduction")}>
              <div className="home-text">
                <h1 className="home-title">{profile.name}</h1>
                <h2 className="home-subtitle">{profile.role}</h2>
                <p className="home-description">{profile.intro}</p>
                <div className="about-meta">
                  <span className="about-location">Location: {profile.location}</span>
                  <div className="about-language-tags">
                    {profile.languages.map((lang) => (
                      <span key={lang} className="about-tag">{lang}</span>
                    ))}
                  </div>
                </div>
                <div className="home-buttons">
                  <Link to="/projects" className="btn btn-primary">View My Work</Link>
                  <Link to="/contact"  className="btn btn-secondary">Get In Touch</Link>
                </div>
                <div className="social-links">
                  {socialLinks.filter((s) => s.essential).map((s) => (
                    <a key={s.name} href={s.link} target="_blank" rel="noopener noreferrer"
                       aria-label={s.name} title={s.name}>
                      <i className={s.icon}></i>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Work */}
            <section className="about-section" id={toId("Work")}>
              <h3 className="about-section-title">Work</h3>
              <div className="about-cards">
                {workExperiences.map((exp) => (
                  <article key={exp.company} className="about-card" id={toId(exp.company)}>
                    <div className="about-card-heading">
                      <h4>{exp.company}</h4>
                      <span>{exp.timeframe}</span>
                    </div>
                    <p className="about-role">{exp.role}</p>
                    <ul>{exp.achievements.map((a) => <li key={a}>{a}</li>)}</ul>
                  </article>
                ))}
              </div>
            </section>

            {/* Studies */}
            <section className="about-section" id={toId("Studies")}>
              <h3 className="about-section-title">Studies</h3>
              <div className="about-cards">
                {studies.map((s) => (
                  <article key={s.institution} className="about-card" id={toId(s.institution)}>
                    <h4>{s.institution}</h4>
                    <p>{s.description}</p>
                  </article>
                ))}
              </div>
            </section>

            {/* Technical Skills */}
            <section className="about-section" id={toId("Technical Skills")}>
              <h3 className="about-section-title">Technical Skills</h3>
              <div className="about-cards">
                {technicalSkills.map((sk) => (
                  <article key={sk.title} className="about-card" id={toId(sk.title)}>
                    <h4>{sk.title}</h4>
                    <p>{sk.description}</p>
                    <div className="about-skill-tags">
                      {sk.tags.map((tag) => (
                        <span key={tag} className="about-tag">{tag}</span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </section>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Home;