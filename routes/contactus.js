const express = require('express');
const Contact = require('../models/contactus');
const router = express.Router();
router.post('/', async (req, res, next) => {
  try {
    const { email, github, facebook, linkedin } = req.body;
    const contact = new Contact({ email, github, facebook, linkedin });
    await contact.save();
    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
});
router.get('/', async (req, res, next) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});
router.get('/:id', async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    res.json(contact);
  } catch (error) {
    next(error);
  }
});
router.put('/:id', async (req, res, next) => {
  try {
    const { email, github, facebook, linkedin } = req.body;
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { email, github, facebook, linkedin },
      { new: true, runValidators: true }
    );
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    res.json(contact);
  } catch (error) {
    next(error);
  }
});
router.delete('/:id', async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    res.json({ message: 'Contact deleted' });
  } catch (error) {
    next(error);
  }
});
module.exports = router;