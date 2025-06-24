const express = require('express');
const Work = require('../models/work');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const work = await Work.find({isactive:true});
    res.json(work);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { title, description, startDate, endDate } = req.body; 
    const work = new Work({ title, description, startDate, endDate });
    await work.save();
    res.status(201).json(work);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { title, description, startDate, endDate } = req.body;
    const work = await Work.findByIdAndUpdate(
      req.params.id,
      { title, description, startDate, endDate },
      { new: true, runValidators: true }
    );
    if (!work) return res.status(404).json({ message: 'Work not found' });
    res.json(work);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const work = await Work.findByIdAndUpdate(
      req.params.id,
      { isactive: false }, 
      { new: true }
    );
    if (!work) return res.status(404).json({ message: 'Work not found' });
    res.json({ message: 'Work deactivated', work });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
