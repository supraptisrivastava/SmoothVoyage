
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

router.use(authenticateUser);


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

  
    const userToInvite = await User.findOne({ email });
    if (userToInvite) {
      if (trip.collaborators.includes(userToInvite._id)) {
        return res.status(400).json({ error: 'User already a collaborator' });
      }

      
      trip.collaborators.push(userToInvite.auth0Id); 

    } else {
      
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


router.get('/', getTripsByUser);

router.get('/:id', getTripById);

router.put('/:id', updateTrip);


router.delete('/:id', deleteTrip);




module.exports = router;

