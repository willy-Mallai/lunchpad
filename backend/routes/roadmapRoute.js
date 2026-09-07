const express = require("express");
const { getRoadmap, saveRoadmap } = require("../controller/roadmapController");
const userAuth = require("../middleware/userAuth");

const roadmapRouter = express.Router();

roadmapRouter.get("/get-roadmap", userAuth, getRoadmap);
roadmapRouter.put("/save-roadmap", userAuth, saveRoadmap);

module.exports = roadmapRouter;
