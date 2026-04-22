import React from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css";

const NAV_LINKS = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/projects", label: "Projects" },
  { path: "/skills", label: "Skills" },
  { path: "/contact", label: "Contact" },
];

const SOCIAL_LINKS = [
  {
    name: "GitHub",
    href: "https://github.com/Nurshafika3",
    icon: "fab fa-github",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/nurshafika-nizam-4a572a21b",
    icon: "fab fa-linkedin",
  },
  {
    name: "Email",
    href: "mailto:shafikanizm@gmail.com",
    icon: "fas fa-envelope",
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-shell">
        <div className="footer-top">
          <div className="footer-brand">
            <p className="footer-eyebrow">Portfolio</p>
            <h3>Nurshafika</h3>
            <p>
              I build clean, responsive web experiences with React, Node.js, and thoughtful UI design.
            </p>

            <div className="footer-socials" aria-label="Social links">
              {SOCIAL_LINKS.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target={item.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={item.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  aria-label={item.name}
                >
                  <i className={item.icon} aria-hidden="true"></i>
                </a>
              ))}
            </div>
          </div>

          <div className="footer-group">
            <p className="footer-label">Quick Links</p>
            <nav className="footer-nav" aria-label="Footer navigation">
              {NAV_LINKS.map((item) => (
                <Link key={item.path} to={item.path}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="footer-group">
            <p className="footer-label">Available For</p>
            <ul className="footer-list">
              <li>Frontend Development</li>
              <li>Backend Development</li>
              <li>Responsive UI Buildouts</li>
              <li>API Integration</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {currentYear} Nurshafika. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
