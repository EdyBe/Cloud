const express = require('express');
const { getStudentVideos } = require('../controllers/studentController');
const router = express.Router();

router.get('/videos', getStudentVideos);

module.exports = router;
