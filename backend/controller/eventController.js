const eventModel = require("../model/eventModel");

const getEvent = async (req, res) => {
  try {
    const event = await eventModel.find({ user: req.userId });
    res.status(200).json({
      success: true,
      data: event,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const addEvent = async (req, res) => {
  try {
    const { title, description, priority, date, time } = req.body;
    const newEvent = await eventModel.create({
      title,
      description,
      priority,
      date,
      time,
      user: req.userId,
    });

    res.status(201).json({
      success: true,
      message: "Created Successfully",
      data: newEvent,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    await eventModel.findByIdAndDelete(eventId);
    res.status(200).json({
      success: true,
      message: "Deleted Succesfully",
      data: eventId,
    });
  } catch (err) {
    res.status(500).json({
      success: false,

      message: err.message,
    });
  }
};

module.exports = { getEvent, addEvent, deleteEvent };
