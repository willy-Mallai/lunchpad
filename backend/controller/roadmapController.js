const roadmapModel = require("../model/roadmapModel");

// 1. Fetch the roadmap for the logged-in user
const getRoadmap = async (req, res) => {
  try {
    let roadmap = await roadmapModel.findOne({ user: req.userId });

    // If they don't have one yet, create an empty one for them!
    if (!roadmap) {
      roadmap = await roadmapModel.create({ user: req.userId, folders: [] });
    }

    res.status(200).json({
      success: true,
      data: roadmap,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 2. Save the completely updated roadmap tree
const saveRoadmap = async (req, res) => {
  try {
    const { folders } = req.body;

    const updatedRoadmap = await roadmapModel.findOneAndUpdate(
      { user: req.userId },
      { folders },
      { returnDocument: "after" },
    );

    res.status(200).json({
      success: true,
      message: "Roadmap Saved Successfully",
      data: updatedRoadmap,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getRoadmap, saveRoadmap };
