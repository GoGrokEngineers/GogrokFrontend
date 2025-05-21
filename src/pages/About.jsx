import React from "react";
import Navbar from "../components/Navbar";

import { Button } from "@mui/material";
import { motion } from "framer-motion";

const AboutPage = () => {
  return (
    <div style={{ backgroundColor: "#161E31", color: "white", minHeight: "100vh" }}>
      <Navbar />

      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          padding: "4rem 2rem",
          gap: "40px",
          maxWidth: "1200px",
          margin: "0 auto"
        }}
      >
        {/* Left - Text Section */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          style={{ flex: "1 1 400px" }}
        >
          <h1
            style={{
              fontSize: "3rem",
              marginBottom: "1rem",
              textShadow: "1px 1px 5px rgba(0,0,0,0.5)"
            }}
          >
            Meet the <span style={{ color: "#ff7f50" }}>GoGrok</span> Team
          </h1>
          <p style={{ fontSize: "1.1rem", lineHeight: "1.8" }}>
            We're a passionate team of developers building cutting-edge,
            performance-focused web experiences. <br /><br />
            Our mission is to empower elite coders and teams by delivering
            intuitive, lightning-fast platforms for tech competitions and more.
          </p>

          {/* Optional CTA Button */}
          <Button
            variant="contained"
            sx={{
              marginTop: "2rem",
              backgroundColor: "#ff7f50",
              color: "white",
              fontSize: "1rem",
              padding: "0.7rem 2rem",
              "&:hover": {
                backgroundColor: "#ff6333",
              },
            }}
          >
            Join Us
          </Button>
        </motion.div>

        {/* Right - Image */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          style={{ flex: "1 1 400px", textAlign: "center" }}
        >
          <img
            src="./about_img.png"
            alt="Team working"
            style={{ maxWidth: "100%", borderRadius: "12px" }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AboutPage;
