const express = require('express');
const bodyParser = require('body-parser');
const uploadRoutes = require('./routes/uploadRoutes');
const studentRoutes = require('./routes/studentRoutes');
const teacherRoutes = require('./routes/teacherRoutes');

const app = express();
const port = 10000;

app.use(bodyParser.json());  // Parse JSON requests

// Define routes
app.use('/api/upload', uploadRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/teacher', teacherRoutes);

app.listen(port, () => {
  console.log(`Server running at https://cloud-fecy.onrender.com`);
});
