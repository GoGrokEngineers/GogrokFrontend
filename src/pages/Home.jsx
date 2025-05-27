import React from "react";
import { Button, Typography, Container, useMediaQuery, useTheme, Box } from "@mui/material";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // <600px
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md")); // 600px - 900px

  const handleGetStarted = () => {
    navigate("/main");
  };

  return (
    <Box
      sx={{
        backgroundColor: "#161E31",
        color: "white",
        minHeight: "100vh",
        pb: 4,
      }}
    >
      <Navbar />

      <Container maxWidth="lg">
        {/* Hero Title */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{ textAlign: "center", marginTop: "50px" }}
        >
          <Typography
            variant="h2"
            component="h1"
            fontWeight="bold"
            sx={{
              fontSize: {
                xs: "2.2rem",
                sm: "2.8rem",
                md: "3.5rem",
              },
            }}
          >
            Welcome to{" "}
            <span style={{ color: "white" }}>Go</span>
            <span style={{ color: "#ff7f50" }}>Grok</span>
          </Typography>
        </motion.div>

        {/* Content Row */}
        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              md: "row",
            },
            gap: 4,
            mt: 5,
            alignItems: "center",
          }}
        >
          {/* Left Text */}
          <motion.div
            style={{ flex: 1 }}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
          >
            <Typography
              variant="body1"
              sx={{
                fontSize: {
                  xs: "1rem",
                  sm: "1.2rem",
                  md: "1.3rem",
                },
                lineHeight: 1.9,
                textAlign: {
                  xs: "center",
                  md: "left",
                },
              }}
            >
              <strong style={{ color: "#ff7f50" }}>GoGrok</strong> is the ultimate platform for elite coders to{" "}
              <strong>compete, challenge their limits</strong>, and grow their skills through
              intense, fair, and exciting competitions. Whether you're preparing
              for coding interviews or just love the thrill of a good challenge,
              GoGrok is your arena.
            </Typography>
          </motion.div>

          {/* Right Image */}
          <motion.div
            style={{ flex: 1, textAlign: "center" }}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
          >
            <img
              src="./home_img.png"
              alt="Competitive coding"
              style={{
                maxWidth: "100%",
                width: "100%",
                height: "auto",
                borderRadius: "12px",
              }}
            />
          </motion.div>
        </Box>

        {/* Centered Button */}
        <motion.div
          style={{ textAlign: "center", marginTop: "40px" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <Button
            variant="contained"
            onClick={handleGetStarted}
            sx={{
              backgroundColor: "#ff7f50",
              color: "white",
              fontSize: {
                xs: "0.9rem",
                sm: "1rem",
              },
              padding: "0.8rem 2rem",
              textTransform: "none",
              borderRadius: "10px",
              "&:hover": {
                backgroundColor: "#ff6333",
              },
            }}
          >
            Get Started
          </Button>
        </motion.div>
      </Container>

           <Box mt={10} px={3} textAlign="center">
        <Typography variant="h5" gutterBottom>Watch Our Story</Typography>
        <Box display="flex" justifyContent="center">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/"
            title="GoGrok Intro Video"
            allowFullScreen
            style={{ borderRadius: "12px" }}
          ></iframe>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
