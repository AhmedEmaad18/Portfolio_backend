const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  technologies: [{
    type: String,
    trim: true
  }],
  link: {
    type: String,
    default: '',
  },
  imageUrl: { type: [String], required: true } 
,
  date: {
    type: Date,
    default: Date.now,
  },isactive: {
    type: Boolean,
    default: true,
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Project', projectSchema);
