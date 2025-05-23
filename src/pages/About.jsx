import React from "react";
import Navbar from "../components/Navbar";
import { Button, Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";

const AboutPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleJoinUsClick = () => {
  window.open("https://www.linkedin.com/company/gogrok", "_blank");
};

  return (
    <Box sx={{ backgroundColor: "#161E31", color: "white", minHeight: "100vh" }}>
      <Navbar />

      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "center",
            px: 3,
            py: 8,
            gap: 6,
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {/* Left - Text Section */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{ flex: "1 1 400px" }}
          >
            <Typography
              variant="h3"
              component="h1"
              fontWeight="bold"
              gutterBottom
              sx={{
                fontSize: {
                  xs: "2rem",
                  sm: "2.5rem",
                  md: "3rem",
                },
                textShadow: "1px 1px 5px rgba(0,0,0,0.5)",
              }}
            >
              Meet the <span style={{ color: "#ff7f50" }}>GoGrok</span> Team
            </Typography>

            <Typography
              variant="body1"
              sx={{
                fontSize: {
                  xs: "1rem",
                  sm: "1.1rem",
                },
                lineHeight: 1.8,
              }}
            >
              We're a passionate team of developers building cutting-edge,
              performance-focused web experiences. <br /><br />
              Our mission is to empower elite coders and teams by delivering
              intuitive, lightning-fast platforms for tech competitions and more.
            </Typography>

            <Button
              variant="contained"
              onClick={handleJoinUsClick}
              sx={{
                mt: 4,
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
              style={{
                width: "100%",
                maxWidth: "500px",
                borderRadius: "12px",
                margin: isMobile ? "0 auto" : 0,
              }}
            />
          </motion.div>
        </Box>
      </motion.div>
    </Box>
  );
};

export default AboutPage;
