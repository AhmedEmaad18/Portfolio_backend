const mongoose = require('mongoose');

const contactschema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
  },
  github: {
    type: String,
    default: '',
  },
  facebook: {
    type: String,
    default: '',
  },
  linkedin: {
    type: String,
    default: '',
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('contact', contactschema);
