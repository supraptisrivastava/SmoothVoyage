
import { useParams } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Collaborators from '../components/Collaborators';
import MapSection from '../components/MapSection';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const TripDetails = () => {
  const { id } = useParams();
  const { getAccessTokenSilently } = useAuth0();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("TripDetails mounted");
    console.log("Trip ID from useParams:", id);
    const fetchTrip = async () => {
      try {
        const token = await getAccessTokenSilently();

        console.log("Access Token:", token);
        console.log(`GET ${import.meta.env.VITE_API_URL}/api/trips/${id}`);

        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/trips/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        console.log("Fetched trip data:", res.data);;
        setTrip(res.data);
      } catch (err) {
        console.error('Error fetching trip details:', err?.response || err.message || err);
      } finally {
        setLoading(false);
      }
    };
     if (id && getAccessTokenSilently) {
    fetchTrip();
  } else {
    console.warn("Missing trip ID or Auth0 context not ready");
  }
}, [id, getAccessTokenSilently]);

   

  if (loading) return <div className="text-center py-20 text-white">Loading...</div>;
  if (!trip) return <div className="text-center py-20 text-red-500">Trip not found</div>;


  
  const {
  tripName,
  destination,
  startDate,
  endDate,
  coordinates,
  description,

} = trip;


  return (
    <div className="max-w-4xl mx-auto p-6 pt-24 text-white min-h-screen bg-[#0a0f2c]">
      <h2 className="text-3xl font-bold mb-4">{tripName || 'Trip Details'}</h2>
      {trip.description && (
  <p className="mb-4 italic text-gray-300">{trip.description}</p>
)}
      <p className="mb-2">
        <strong>Destination:</strong> {destination}
      </p>
      <p className="mb-2">
        <strong>Start:</strong> {new Date(startDate).toLocaleDateString()}
      </p>
      <p className="mb-2">
        <strong>End:</strong> {new Date(endDate).toLocaleDateString()}
      </p>

      <Collaborators
  collaborators={trip.collaborators || []}
 
  onInvite={async (email) => {
  try {
    const token = await getAccessTokenSilently();
    
    console.log("Inviting email:", email);
    console.log("Trip ID:", trip._id); 

    const res = await axios.post(
     `${import.meta.env.VITE_API_URL}/api/trips/${id}/invite`,
      { email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        
      }
    );
    console.log("Invite response:", res.data);
  } catch (err) {
    console.error("Invite failed:", err?.response || err.message);
  }
}}

/>


   
      <div className="mt-6">
        {coordinates?.lat && coordinates?.lng ? (
          <MapSection
            center={[coordinates.lat, coordinates.lng]}
            markers={[
              {
                id: 'trip',
                lat: coordinates.lat,
                lng: coordinates.lng,
                label: destination,
              },
            ]}
          />
        ) : (
          <p className="text-yellow-400 mt-4">Location unavailable or invalid.</p>
        )}
        {description && (
  <p className="mt-4">
    <span className="font-bold">Description:</span> {description}
  </p>
)}
      </div>
    </div>
  );
};

export default TripDetails;

