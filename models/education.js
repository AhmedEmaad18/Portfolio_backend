const mongoose = require('mongoose');

const education = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    default: '',
  },summary: {
    type: String,
    default: '',
  },grade: {
    type: String,
    default: '',
  },
  date: {
    type: Date,
    default: Date.now,
  },isactive: {
    type: Boolean,
    default: true,
  }
},{
  timestamps: true,
});

module.exports = mongoose.model('edu', education);
