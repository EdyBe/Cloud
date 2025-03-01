const express = require('express');
const { uploadVideo } = require('../controllers/uploadController');
const router = express.Router();

router.post('/video', uploadVideo);

module.exports = router;
