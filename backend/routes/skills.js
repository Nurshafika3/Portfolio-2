const express = require("express");
const router = express.Router();

// Sample skills data
const skills = {
  frontend: [
    { name: "React.js", level: 90, icon: "fab fa-react" },
    { name: "JavaScript", level: 85, icon: "fab fa-js-square" },
    { name: "HTML5", level: 95, icon: "fab fa-html5" },
    { name: "CSS3", level: 90, icon: "fab fa-css3-alt" },
    { name: "TypeScript", level: 80, icon: "fab fa-js-square" },
    { name: "Vue.js", level: 75, icon: "fab fa-vuejs" },
  ],
  backend: [
    { name: "Node.js", level: 85, icon: "fab fa-node-js" },
    { name: "Express.js", level: 80, icon: "fas fa-server" },
    { name: "Python", level: 75, icon: "fab fa-python" },
    { name: "MongoDB", level: 70, icon: "fas fa-database" },
    { name: "PostgreSQL", level: 65, icon: "fas fa-database" },
    { name: "REST APIs", level: 85, icon: "fas fa-code" },
  ],
  tools: [
    { name: "Git", level: 90, icon: "fab fa-git-alt" },
    { name: "VS Code", level: 95, icon: "fas fa-code" },
    { name: "Docker", level: 70, icon: "fab fa-docker" },
    { name: "AWS", level: 65, icon: "fab fa-aws" },
    { name: "Figma", level: 75, icon: "fab fa-figma" },
    { name: "Postman", level: 80, icon: "fas fa-code" },
  ],
};

// GET /api/skills - Get all skills
router.get("/", (req, res) => {
  try {
    res.json(skills);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch skills" });
  }
});

// GET /api/skills/:category - Get skills by category
router.get("/:category", (req, res) => {
  try {
    const { category } = req.params;

    if (!skills[category]) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.json(skills[category]);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch skills" });
  }
});

module.exports = router;
