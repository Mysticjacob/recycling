const express = require("express");
const { submitQuery, autoReply, getAllQueries, respondToQuery } = require("../controllers/queryController");

const router = express.Router();

router.post("/submit", submitQuery);
router.post("/reply", autoReply); 
router.get("/queries", getAllQueries); 
router.post("/queries/:id/respond", respondToQuery); 

module.exports = router;
