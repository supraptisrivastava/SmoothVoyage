// routes/trips.js
const express = require('express');
const router = express.Router();
const {
  createTrip,
  getTripsByUser,
  getTripById,
  updateTrip,
  deleteTrip
} = require('../controllers/tripController');
const { authenticateUser } = require('../middlewares/authMiddleware');
// throw new Error("🔥 trips.js definitely loaded");
// console.log("✅ trip routes loaded");

// Protect all trip routes
router.use(authenticateUser);


// Create a new trip
router.post('/', createTrip);



router.post('/:id/invite',authenticateUser, async (req, res) => {
  const Trip = require('../models/Trip');
  const User = require('../models/User');
  const { id: tripId } = req.params;
  const { email } = req.body;
  const userId = req.user.sub;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const trip = await Trip.findById(tripId);
    if (!trip) return res.status(404).json({ error: 'Trip not found' });

    if (trip.user.toString() !== userId) {
      return res.status(403).json({ error: 'You are not the trip owner' });
    }

    // If user exists
    const userToInvite = await User.findOne({ email });
    if (userToInvite) {
      if (trip.collaborators.includes(userToInvite._id)) {
        return res.status(400).json({ error: 'User already a collaborator' });
      }

      // trip.collaborators.push(userToInvite._id);
      // trip.collaborators.push(userToInvite.sub); // ✅ Add Auth0 ID string
      trip.collaborators.push(userToInvite.auth0Id); // ✅ Correct: use `auth0Id` from your User model

    } else {
      // If user doesn't exist yet, add to pending invites
      if (trip.pendingInvites?.includes(email)) {
        return res.status(400).json({ error: 'Email already invited' });
      }

      trip.pendingInvites = [...(trip.pendingInvites || []), email];
    }

    await trip.save();
    res.status(200).json({ message: 'Invitation recorded successfully', trip });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});
// Get all trips for the authenticated user

router.get('/', getTripsByUser);

// Get single trip by ID
router.get('/:id', getTripById);

// Update a trip
router.put('/:id', updateTrip);

// Delete a trip
router.delete('/:id', deleteTrip);

// ...existing routes above...

// Invite a collaborator to a trip


module.exports = router;

