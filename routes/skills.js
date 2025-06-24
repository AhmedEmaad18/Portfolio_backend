const express = require('express');
const Skill = require('../models/skills');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const skills = await Skill.find({ isactive: true });
    res.json(skills);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { name, proficiency, category, isactive } = req.body;
    const skill = new Skill({ name, proficiency, category, isactive });
    await skill.save();
    res.status(201).json(skill);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { name, proficiency, category } = req.body;
    const skill = await Skill.findByIdAndUpdate(
      req.params.id,
      { name, proficiency, category },
      { new: true, runValidators: true }
    );
    if (!skill) return res.status(404).json({ message: 'Skill not found' });
    res.json(skill);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const skill = await Skill.findByIdAndUpdate(
      req.params.id,
      { isactive: false },
      { new: true }
    );
    if (!skill) return res.status(404).json({ message: 'Skill not found' });
    res.json({ message: 'Skill deactivated', skill });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
