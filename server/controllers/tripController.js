

  const Trip = require('../models/Trip');


  const createTrip = async (req, res) => {
    try {
        console.log("📥 Received trip data:", req.body);
        console.log("📥 Coordinates received:", req.body.coordinates);
        console.log("📥 Description received:", req.body.description);
        console.log("📥 Auth received:", req.user);

      const { tripName, destination, startDate, endDate, description, coordinates } = req.body;
console.log("📥 Controller Received:", {
  tripName, destination, startDate, endDate, description, coordinates
});

    
      const userId =  req.user?.sub;
if (!userId) {
  return res.status(401).json({ message: 'Unauthorized: No valid user' });
}

console.log("📥 Received in controller:", req.body);

      const newTrip = new Trip({
        tripName,
        destination,
        startDate,
        endDate,
        description,
        coordinates,
        user: userId,
      });

      await newTrip.save();
      console.log("📦 Saving trip:", newTrip);
      res.status(201).json(newTrip);
    } catch (error) {
      console.error('❌ Error creating trip:', error);
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  };


  const getTripsByUser = async (req, res) => {
    try {
     
      const trips = await Trip.find({ user: req.user.sub }).sort({ startDate: 1 });

const formattedTrips = trips.map((trip) => ({
  ...trip._doc,
  title: trip.tripName,
}));

res.status(200).json(formattedTrips);

    } catch (error) {
      console.error('❌ Error fetching trips:', error);
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  };

 
  const getTripById = async (req, res) => {
    try {
      const trip = await Trip.findOne({ _id: req.params.id, user: req.user.sub });

      if (!trip) return res.status(404).json({ message: 'Trip not found' });
      res.status(200).json(trip);
    } catch (error) {
      console.error('❌ Error getting trip:', error);
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  };

  const updateTrip = async (req, res) => {
    try {
      const updated = await Trip.findOneAndUpdate(
        { _id: req.params.id, user: req.user.sub },
        req.body,
        { new: true }
      );

      if (!updated) return res.status(404).json({ message: 'Trip not found' });
      res.status(200).json(updated);
    } catch (error) {
      console.error('❌ Error updating trip:', error);
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  };


  const deleteTrip = async (req, res) => {
    try {
      const deleted = await Trip.findOneAndDelete({
        _id: req.params.id,
        user: req.user.sub,
      });

      if (!deleted) return res.status(404).json({ message: 'Trip not found' });
      res.status(200).json({ message: 'Trip deleted successfully' });
    } catch (error) {
      console.error('❌ Error deleting trip:', error);
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  };

  module.exports = {
    createTrip,
    getTripsByUser,
    getTripById,
    updateTrip,
    deleteTrip,
  };
