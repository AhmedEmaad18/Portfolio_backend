const express = require('express');
const Contact = require('../models/contactme');
const router = express.Router();
router.post('/', async (req, res, next) => {
  try {
    const { email, message } = req.body;
    const contact = new Contact({ email, message});
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

module.exports = router;