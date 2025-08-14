
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  sub: {
    type: String,
    required: true,
    unique: true,
  },
  name: String,
  email: {
    type: String,
    required: true,
    unique: true, 
  },
});

module.exports = mongoose.model('User', userSchema);
