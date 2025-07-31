const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
 user: {
  type: String,  // ✅ CORRECT: Auth0 `sub` is a string like "auth0|abc123"
  required: true,
},
  tripName: {
    type: String,
    required: true,
  },
   description: {
    type: String, 
  },
  destination: {
    type: String,
    required: true,
  },
  
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
 coordinates: {
  type: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  required: true,
},
collaborators: [
  {
    type: String, // Auth0 `sub` values
    required: true,
  }
],
pendingInvites: {
    type: [String],
    default: [],
  },  
  activities: [
    {
      type: String,
    },
  ],  
}, { timestamps: true });

const Trip = mongoose.model('Trip', tripSchema);
module.exports = Trip;
