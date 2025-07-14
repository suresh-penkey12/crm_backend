const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { getExternalData } = require("../controllers/externalController");

router.get("/", auth, getExternalData);

module.exports = router;
