import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    // Reload and redirect to home
    window.location.href = "/";
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
        backgroundColor: "#161E31",
        color: "white",
      }}
    >
      {/* Logo */}
      <h2
        onClick={handleLogoClick}
        style={{
          margin: 0,
          cursor: "pointer",
          fontSize: "1.8rem",
        }}
      >
        MySite
      </h2>

      {/* Navigation links */}
      <ul
        style={{
          listStyle: "none",
          display: "flex",
          gap: "2rem",
          margin: 0,
          padding: 0,
        }}
      >
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
              style={{
                color: "white",
                textDecoration: "none",
                fontSize: "1.2rem",
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#ff7f50")}
              onMouseLeave={(e) => (e.target.style.color = "white")}
            >
              {text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
