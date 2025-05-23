import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css"; // Adjust the path as necessary
import { FaHome, FaInfoCircle, FaPlay } from "react-icons/fa";
const Navbar = () => {
  const icons = {
    Home: <FaHome />,
    About: <FaInfoCircle />,
    Start: <FaPlay />,
  };
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogoClick = () => {
    window.location.href = "/";
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Close menu on link click or clicking outside (overlay)
  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <nav>
        <h2 onClick={handleLogoClick} className="logo">
          <span style={{ color: "white" }}>Go</span>
          <span style={{ color: "#ff7f50" }}>Grok</span>
        </h2>

        {/* Hamburger menu button */}
        <div
          className={`hamburger ${menuOpen ? "active" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") toggleMenu();
          }}
        >
          <div />
          <div />
          <div />
        </div>

        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          {["Home", "About", "Start"].map((text, idx) => (
            <li key={idx}>
              <Link
                to={
                  text === "Home"
                    ? "/"
                    : text === "Start"
                    ? "/main"
                    : `/${text.toLowerCase()}`
                }
                onClick={closeMenu}
              >
                {/* Icon only visible on mobile sidebar */}
                <span className="nav-icon">{icons[text]}</span>
                {text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Overlay */}
      <div
        className={`sidebar-overlay ${menuOpen ? "active" : ""}`}
        onClick={closeMenu}
        aria-hidden={!menuOpen}
      />
    </>
  );
};

export default Navbar;
