const Lead = require("../models/LeadModel");

exports.getLeads = async (req, res) => {
  const leads = await Lead.find();
  res.json(leads);
};

exports.createLead = async (req, res) => {
  const { firstName, lastName, age, dateOfContact, level, notes } = req.body;

  if (!firstName || !lastName || !age || !dateOfContact || !level || !notes)
    return res.status(400).json({ message: "All fields required" });

  if (age < 18 || age > 100)
    return res.status(400).json({ message: "Invalid age" });

  if (new Date(dateOfContact) > new Date())
    return res.status(400).json({ message: "Date cannot be in future" });

  const newLead = await Lead.create({ firstName, lastName, age, dateOfContact, level, notes });
  res.status(201).json(newLead);
};

exports.updateLead = async (req, res) => {
  const updated = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.deleteLead = async (req, res) => {
  await Lead.findByIdAndDelete(req.params.id);
  res.json({ message: "Lead deleted" });
};
