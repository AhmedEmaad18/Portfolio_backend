const mongoose = require('mongoose');

const contactmeschema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
  },
  message: {
    type: String,
    required:true,
    default: '',
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('contactme', contactmeschema);
