import React, { useState } from "react";
import Navbar from "../components/Navbar";
import {
  Button,
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Avatar,
  Card,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { motion } from "framer-motion";

const teamMembers = [
  { name: "Abubakrsiddik", role: "Frontend Lead", image: "/face.jpg" },
  { name: "Feruzbek", role: "Backend Engineer", image: "/face.jpg" },
  { name: "Musokhon", role: "Backend Engineer", image: "/face.jpg" },
];

const techStack = [
  { name: "React", logo: "/reactt.svg" },
  { name: "Node.js", logo: "/nodejs.svg" },
  { name: "MongoDB", logo: "/python.svg" },
  { name: "TypeScript", logo: "/java.svg" },
];

const AboutPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleJoinUsClick = () => {
    window.open("https://www.linkedin.com/company/gogrok", "_blank");
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? teamMembers.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === teamMembers.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <Box sx={{ backgroundColor: "#161E31", color: "white", minHeight: "100vh" }}>
      <Navbar />

      {/* Hero Section */}
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
                fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                textShadow: "1px 1px 5px rgba(0,0,0,0.5)",
              }}
            >
              Meet the <span style={{ color: "#ff7f50" }}>GoGrok</span> Team
            </Typography>

            <Typography
              variant="body1"
              sx={{ fontSize: { xs: "1rem", sm: "1.1rem" }, lineHeight: 1.8 }}
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

      {/* Team Members Carousel */}
      <Box px={3} mt={8} textAlign="center">
        <Typography variant="h4" gutterBottom>
          Our Team
        </Typography>

        <Box display="flex" justifyContent="center" alignItems="center" gap={2} mt={4}>
          <IconButton onClick={handlePrev} sx={{ color: "white" }}>
            <ArrowBackIosNewIcon />
          </IconButton>

          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card
              sx={{
                p: 6,
                backgroundColor: "#1E2A45",
                color: "white",
                maxWidth: 600,
                minHeight: 350,
              }}
            >
              <Avatar
                src={teamMembers[currentIndex].image}
                alt={teamMembers[currentIndex].name}
                sx={{ width: 140, height: 140, mx: "auto", mb: 3 }}
              />
              <Typography fontWeight="bold" variant="h5">
                {teamMembers[currentIndex].name}
              </Typography>
              <Typography variant="body1" color="gray">
                {teamMembers[currentIndex].role}
              </Typography>
            </Card>
          </motion.div>

          <IconButton onClick={handleNext} sx={{ color: "white" }}>
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Tech Stack */}
      <Box mt={10} textAlign="center">
        <Typography variant="h5" mb={3}>Our Tech Stack</Typography>
        <Box display="flex" justifyContent="center" gap={4} flexWrap="wrap">
          {techStack.map((tech, idx) => (
            <img key={idx} src={tech.logo} alt={tech.name} width={50} style={{marginBottom: "40px"}}/>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default AboutPage;