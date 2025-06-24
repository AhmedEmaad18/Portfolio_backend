const mongoose = require('mongoose');

const certSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    default: '',
  },
  date:{
    type:Date,
    default:''
  },isactive: {
    type: Boolean,
    default: true,
  }

});

module.exports = mongoose.model('cert', certSchema);
