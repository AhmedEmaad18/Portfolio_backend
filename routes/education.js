const express = require('express');
const Skill = require('../models/education');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const edu = await Skill.find({ isactive: true });
    res.json(edu);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { title, description, date, summary, grade, isactive } = req.body;
    const edu = new Skill({ title, description, date, summary, grade, isactive });
    await edu.save();
    res.status(201).json(edu);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { title, description, date, summary, grade } = req.body;
    const edu = await Skill.findByIdAndUpdate(
      req.params.id,
      { title, description, date, summary, grade },
      { new: true, runValidators: true }
    );
    if (!edu) return res.status(404).json({ message: 'Project not found' });
    res.json(edu);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const edu = await Skill.findByIdAndUpdate(
      req.params.id,
      { isactive: false },
      { new: true }
    );
    if (!edu) return res.status(404).json({ message: 'Project not found' });
    res.json({ message: 'Project deactivated', edu });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
