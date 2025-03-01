const express = require('express');
const { getTeacherVideos } = require('../controllers/teacherController');
const router = express.Router();

router.get('/videos', getTeacherVideos);

module.exports = router;
