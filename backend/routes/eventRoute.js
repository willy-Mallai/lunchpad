const express = require("express");

const userAuth = require("../middleware/userAuth");
const {
  getEvent,
  addEvent,
  deleteEvent,
} = require("../controller/eventController");
const eventRouter = express.Router();

eventRouter.get("/get-event", userAuth, getEvent);
eventRouter.post("/add-event", userAuth, addEvent);
eventRouter.delete("/delete-event/:id", userAuth, deleteEvent);

module.exports = eventRouter;
