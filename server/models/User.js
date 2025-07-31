// // models/User.js
// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   auth0Id: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   name: String,
//   email: String,
// });

// module.exports = mongoose.model('User', userSchema);
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  sub: { // ✅ Rename from auth0Id → sub (to match Auth0 `sub`)
    type: String,
    required: true,
    unique: true,
  },
  name: String,
  email: {
    type: String,
    required: true,
    unique: true, // recommended to avoid duplicate invites
  },
});

module.exports = mongoose.model('User', userSchema);
