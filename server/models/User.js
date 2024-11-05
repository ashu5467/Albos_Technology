// backend/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true , unique: true},
  role: { type: String, required: true, enum: ['User', 'Admin'] },
  status: { type: String, required: true, enum: ['Active', 'Inactive'] },
  // add other fields as necessary
});

module.exports = mongoose.model('User', userSchema);
