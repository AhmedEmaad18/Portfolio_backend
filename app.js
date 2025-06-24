   const express = require('express');
   const path = require('path');
   const cors = require('cors');
   const mongoose = require('mongoose');
   require('dotenv').config();

   const app = express();
   app.use(cors());
   app.use(express.json());

   app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

   mongoose.connect('mongodb://127.0.0.1:27017/portfolioDb').then(() => {
     console.log('MongoDB connection established');
   }).catch((error) => {
     console.error('MongoDB connection error:', error);
   });

   const projectsRoutes = require('./routes/projects.js');
   const skillsRoutes = require('./routes/skills.js');
   const aboutRoutes = require('./routes/about.js');
   const eduRoutes = require('./routes/education.js');
   const contactRoutes = require('./routes/contactus.js');
   const certRoutes = require('./routes/cert.js');
   const workRoutes = require('./routes/work.js');
   const contactme = require('./routes/contactme.js');

   app.use('/projects', projectsRoutes);
   app.use('/skills', skillsRoutes);
   app.use('/about', aboutRoutes);
   app.use('/edu', eduRoutes);
   app.use('/contact', contactRoutes);
   app.use('/work', workRoutes);
   app.use('/cert', certRoutes);
      app.use('/contactme', contactme);

   app.use((req, res) => {
     res.status(404).json({ message: 'Route not found' });
   });

   app.use((err, req, res, next) => {
     console.error(err.stack);
     res.status(500).json({ message: 'Server error', error: err.message });
   });

   const PORT = process.env.PORT || 5000;

   app.listen(PORT, () => {
     console.log(`Server running on port ${PORT}`);
   });
   