// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';

// const MapView = ({ location }) => {
//   // Use fallback coordinates if not provided
//   const lat = location?.lat ?? 28.6139; // Default: Delhi
//   const lng = location?.lng ?? 77.2090;

//   // If lat/lng are undefined, don't render the map at all
//   if (!lat || !lng) {
//     return <p>Loading map...</p>;
//   }

//   return (
//     <div className="h-64 w-full rounded-2xl overflow-hidden shadow-lg border border-gray-300">
//       <MapContainer
//         center={[lat, lng]}
//         zoom={13}
//         style={{ height: '100%', width: '100%' }}
//         scrollWheelZoom={false}
//       >
//         <TileLayer
//           attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//         <Marker position={[lat, lng]}>
//           <Popup>Trip Location</Popup>
//         </Marker>
//       </MapContainer>
//     </div>
//   );
// };

// export default MapView;
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';

// Component to dynamically change the map center
const ChangeMapCenter = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    if (center && center.lat && center.lng) {
      map.setView([center.lat, center.lng], 13);
    }
  }, [center, map]);
  return null;
};

const MapView = ({ location }) => {
  // Accepts either lat/lng or lat/lon
  const lat = location?.lat ?? location?.latitude ?? 28.6139;
  const lng = location?.lng ?? location?.lon ?? location?.longitude ?? 77.2090;

  if (!lat || !lng || isNaN(lat) || isNaN(lng)) {
    return (
      <div className="text-gray-500 italic mt-2">
        Location unavailable or invalid. Please select a valid place.
      </div>
    );
  }

  return (
    <div className="h-64 w-full rounded-2xl overflow-hidden shadow-lg border border-gray-300">
      <MapContainer
        center={[lat, lng]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]}>
          <Popup>Selected Trip Location</Popup>
        </Marker>
        <ChangeMapCenter center={{ lat, lng }} />
      </MapContainer>
    </div>
  );
};

export default MapView;
