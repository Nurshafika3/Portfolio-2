import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Navbar.css";

const ROUTES = [
  { path: "/", label: "Home", match: (pathname) => pathname === "/" },
  { path: "/about", label: "About", match: (pathname) => pathname === "/about" },
  { path: "/projects", label: "Projects", match: (pathname) => pathname.startsWith("/projects") },
  { path: "/skills", label: "Skills", match: (pathname) => pathname.startsWith("/skills") },
  { path: "/contact", label: "Contact", match: (pathname) => pathname.startsWith("/contact") },
];

const TimeDisplay = ({ timeZone, locale = "en-GB" }) => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = new Intl.DateTimeFormat(locale, {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(now);
      setCurrentTime(timeString);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, [timeZone, locale]);

  return <span>{currentTime}</span>;
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLight] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={`navbar ${isLight ? "light" : ""}`}>
      <div className="nav-container">
        <div className="nav-meta nav-location">Kuala Lumpur, MY</div>

        <div className="nav-center-wrap">
          <div className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
            {ROUTES.map((route) => (
              <Link
                key={route.path}
                to={route.path}
                className={`nav-link ${route.match(location.pathname) ? "active" : ""}`}
                onClick={closeMenu}
              >
                {route.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="nav-meta nav-time">
          <TimeDisplay timeZone="Asia/Kuala_Lumpur" />
        </div>

        <button
          type="button"
          className={`nav-toggle ${isMenuOpen ? "active" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
