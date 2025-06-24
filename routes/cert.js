const express = require('express');
const Cert = require('../models/cert');
const router = express.Router();
router.get('/', async (req, res, next) => {
  try {
    const cert = await Cert.find({ isactive: true });
    res.json(cert);
  } catch (error) {
    next(error);
  }
});
router.post('/', async (req, res, next) => {
  try {
    const { title, description, date, isactive } = req.body;
    const cert = new Cert({ title, description, date, isactive });
    await cert.save();
    res.status(201).json(cert);
  } catch (error) {
    next(error);
  }
});
router.put('/:id', async (req, res, next) => {
  try {
    const { title, description, date } = req.body;
    const cert = await Cert.findByIdAndUpdate(
      req.params.id,
      { title, description, date },
      { new: true, runValidators: true }
    );
    if (!cert) return res.status(404).json({ message: 'Skill not found' });
    res.json(cert);
  } catch (error) {
    next(error);
  }
});
router.delete('/:id', async (req, res, next) => {
  try {
    const cert = await Cert.findByIdAndUpdate(
      req.params.id,
      { isactive: false },
      { new: true }
    );
    if (!cert) return res.status(404).json({ message: 'Skill not found' });
    res.json({ message: 'Skill deactivated', cert });
  } catch (error) {
    next(error);
  }
});
module.exports = router;
