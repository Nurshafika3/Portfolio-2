const express = require("express");
const router = express.Router();

// Sample projects data (in a real app, this would come from a database)
const projects = [
  {
    id: 1,
    title: "E-Commerce Website",
    description:
      "A full-stack e-commerce application built with React and Node.js",
    technologies: ["React", "Node.js", "MongoDB", "Express"],
    githubUrl: "https://github.com/yourusername/ecommerce-app",
    liveUrl: "https://your-ecommerce-app.com",
    imageUrl: "/images/project1.jpg",
    featured: true,
  },
  {
    id: 2,
    title: "hiNutrition: AR Guide to Diseases for Kids App",
    description:
      "HiNutrition is an AR-based app that helps children learn about nutrition and diseases through 3D visuals and interactive quizzes. It features engaging design, 2D booklet images, and AR-enhanced 3D models to make learning fun and educational under parental guidance.",
    technologies: ["React", "Socket.io", "Node.js", "PostgreSQL"],
    githubUrl: "https://github.com/Nurshafika3/hiNutrition-Mobile-Apps",
    imageUrl: "/images/project2.jpg",
    featured: true,
  },
  {
    id: 3,
    title: "hiHealth Mobile Application",
    description: "HiHealth is a comprehensive mobile health application built with Ionic Angular that provides users with detailed information about common diseases and health conditions. This application serves as a digital health companion, offering symptoms, causes, treatments, and preventive measures for various medical conditions.",
    technologies: ["JavaScript", "HTML5", "CSS3", "Weather API"],
    githubUrl: "https://github.com/Nurshafika3/HiHealth",
    imageUrl: "/images/project3.jpg",
    featured: false,
  },
];

// GET /api/projects - Get all projects
router.get("/", (req, res) => {
  try {
    const { featured } = req.query;

    if (featured === "true") {
      const featuredProjects = projects.filter((project) => project.featured);
      return res.json(featuredProjects);
    }

    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

// GET /api/projects/:id - Get a specific project
router.get("/:id", (req, res) => {
  try {
    const projectId = parseInt(req.params.id);
    const project = projects.find((p) => p.id === projectId);

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch project" });
  }
});

module.exports = router;
