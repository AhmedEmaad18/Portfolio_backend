const express = require('express');
const About = require('../models/about');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const aboutInfo = await About.findOne();
    if (!aboutInfo) return res.status(404).json({ message: 'About info not found' });
    res.json(aboutInfo);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const aboutData = req.body;
    let aboutInfo = await About.findOne();
    if (aboutInfo) {
      Object.assign(aboutInfo, aboutData);
      await aboutInfo.save();
      return res.json(aboutInfo);
    }
    aboutInfo = new About(aboutData);
    await aboutInfo.save();
    res.status(201).json(aboutInfo);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
