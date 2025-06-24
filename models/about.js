const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    default: '',
  },
  email: {
    type: String,
    default: '',
  },
  phone: {
    type: String,
    default: '',
  },
  socialLinks: {
    github: String,
    linkedin: String,
    twitter: String,
    website: String,
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('About', aboutSchema);
