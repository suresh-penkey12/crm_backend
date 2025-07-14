const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true, min: 18, max: 100 },
  dateOfContact: { type: Date, required: true },
  level: { type: String, enum: ["Very Hot", "Hot", "Cold"], required: true },
  notes: { type: String, required: true },
});

module.exports = mongoose.model("Lead", leadSchema);
