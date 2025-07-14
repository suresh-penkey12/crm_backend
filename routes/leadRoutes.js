const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { getLeads, createLead, updateLead, deleteLead } = require("../controllers/leadController");

router.get("/", auth, getLeads);
router.post("/", auth, createLead);
router.put("/:id", auth, updateLead);
router.delete("/:id", auth, deleteLead);

module.exports = router;
