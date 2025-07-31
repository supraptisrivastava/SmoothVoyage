import { Link } from 'react-router-dom';

const TripCard = ({ trip }) => (
  <div className="bg-white p-4 rounded-lg shadow">
    <h3 className="text-xl font-semibold">{trip.title}</h3>
    <p className="text-gray-600">{trip.destination}</p>
    <p className="text-gray-500 text-sm mt-2">{new Date(trip.startDate).toLocaleDateString()} – {new Date(trip.endDate).toLocaleDateString()}</p>
    <Link
      to={`/trip/${trip._id}`}
      className="inline-block mt-3 text-blue-600 hover:underline"
    >View Details</Link>
  </div>
);

export default TripCard;
