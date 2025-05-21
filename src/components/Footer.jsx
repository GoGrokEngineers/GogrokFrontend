import React from "react";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#0F1626",
        color: "white",
        textAlign: "center",
        padding: "1.5rem 1rem",
        borderTop: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <p style={{ margin: 0, fontSize: "1rem" }}>
        &copy; {new Date().getFullYear()} <span style={{ color: "#ff7f50" }}>GoGrok</span>. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
