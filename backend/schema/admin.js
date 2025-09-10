const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isSuperuser: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
