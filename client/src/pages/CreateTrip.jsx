// // import { useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import axios from 'axios';
// // import { useAuth0 } from '@auth0/auth0-react';

// // const CreateTrip = () => {
// //   const [title, setTitle] = useState('');
// //   const [destination, setDestination] = useState('');
// //   const [startDate, setStartDate] = useState('');
// //   const [endDate, setEndDate] = useState('');
// //   const [description, setDescription] = useState('');
// //   const [loading, setLoading] = useState(false);
// //   const navigate = useNavigate();
// // const { getAccessTokenSilently } = useAuth0();


// //  const handleSubmit = async (e) => {
// //   e.preventDefault();
// //   if (!title || !destination || !startDate || !endDate) {
// //     alert('Please fill all required fields.');
// //     return;
// //   }

// //   try {
// //     setLoading(true);
// //     const token = await getAccessTokenSilently({
// //   authorizationParams: {
// //     audience: 'https://dev-0ogi62ybd1xflev7.us.auth0.com/api/v2/',
// //   },
// // });
// // console.log("🔐 Token:", token);
// // console.log("🔍 Decoded:", JSON.parse(atob(token.split('.')[1])));
// //     const response = await axios.post(
// //       'http://localhost:5000/api/trips',
// //       {
// //         tripName: title,       // ✅ renamed for backend schema
// //         destination,
// //         startDate,
// //         endDate,
// //         notes: description,    // ✅ renamed for backend schema
// //       },
// //       {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //         },
// //       }
// //     );

// //     if (response.status === 201) {
// //       alert('Trip created successfully!');
// //       navigate('/dashboard');
// //     } else {
// //       alert('Something went wrong.');
// //     }
// //   } catch (error) {
// //     console.error(error);
// //     alert('Failed to create trip.');
// //   } finally {
// //     setLoading(false);
// //   }
// // };

// //   return (
// //     <div className="min-h-screen bg-gray-50 py-10 px-6 flex justify-center items-start">
// //       <div className="w-full max-w-xl bg-white shadow-md rounded-lg p-8">
// //         <h2 className="text-2xl font-bold mb-6 text-gray-800">Create a New Trip</h2>
// //         <form onSubmit={handleSubmit} className="space-y-5">
// //           <div>
// //             <label className="block text-gray-700 font-medium">Trip Title</label>
// //             <input
// //               type="text"
// //               value={title}
// //               onChange={(e) => setTitle(e.target.value)}
// //               className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md focus:ring focus:ring-blue-200"
// //               placeholder="e.g., Summer in Spain"
// //               required
// //             />
// //           </div>

// //           <div>
// //             <label className="block text-gray-700 font-medium">Destination</label>
// //             <input
// //               type="text"
// //               value={destination}
// //               onChange={(e) => setDestination(e.target.value)}
// //               className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md focus:ring focus:ring-blue-200"
// //               placeholder="e.g., Barcelona"
// //               required
// //             />
// //           </div>

// //           <div className="grid grid-cols-2 gap-4">
// //             <div>
// //               <label className="block text-gray-700 font-medium">Start Date</label>
// //               <input
// //                 type="date"
// //                 value={startDate}
// //                 onChange={(e) => setStartDate(e.target.value)}
// //                 className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md focus:ring focus:ring-blue-200"
// //                 required
// //               />
// //             </div>
// //             <div>
// //               <label className="block text-gray-700 font-medium">End Date</label>
// //               <input
// //                 type="date"
// //                 value={endDate}
// //                 onChange={(e) => setEndDate(e.target.value)}
// //                 className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md focus:ring focus:ring-blue-200"
// //                 required
// //               />
// //             </div>
// //           </div>

// //           <div>
// //             <label className="block text-gray-700 font-medium">Description</label>
// //             <textarea
// //               value={description}
// //               onChange={(e) => setDescription(e.target.value)}
// //               className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md focus:ring focus:ring-blue-200"
// //               rows="4"
// //               placeholder="Optional description"
// //             />
// //           </div>

// //           <button
// //             type="submit"
// //             disabled={loading}
// //             className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-60"
// //           >
// //             {loading ? 'Creating...' : 'Create Trip'}
// //           </button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CreateTrip;
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { useAuth0 } from '@auth0/auth0-react';
// import PlaceSearch from '../components/PlaceSearch'; // ✅ make sure path is correct
// import MapView from '../components/MapView'; // ✅ add this component if needed

// const CreateTrip = () => {
//   const [title, setTitle] = useState('');
//   const [destination, setDestination] = useState('');
//   const [coordinates, setCoordinates] = useState(null); // ✅ lat/lng
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [description, setDescription] = useState('');
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();
//   const { getAccessTokenSilently } = useAuth0();

//   const handlePlaceSelect = (place) => {
//     setDestination(place.display_name);
//     setCoordinates({
//       lat: parseFloat(place.lat),
//       lon: parseFloat(place.lon),
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!title || !destination || !startDate || !endDate) {
//       alert('Please fill all required fields.');
//       return;
//     }

//     try {
//       setLoading(true);
//       const token = await getAccessTokenSilently({
//         authorizationParams: {
//           audience: 'https://dev-0ogi62ybd1xflev7.us.auth0.com/api/v2/',
//         },
//       });

//       const response = await axios.post(
//         'http://localhost:5000/api/trips',
//         {
//           tripName: title,
//           destination,
//           coordinates,
//           startDate,
//           endDate,
//           notes: description,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.status === 201) {
//         alert('Trip created successfully!');
//         navigate('/dashboard');
//       } else {
//         alert('Something went wrong.');
//       }
//     } catch (error) {
//       console.error(error);
//       alert('Failed to create trip.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-10 px-6 flex justify-center items-start">
//       <div className="w-full max-w-xl bg-white shadow-md rounded-lg p-8">
//         <h2 className="text-2xl font-bold mb-6 text-gray-800">Create a New Trip</h2>
//         <form onSubmit={handleSubmit} className="space-y-5">
//           <div>
//             <label className="block text-gray-700 font-medium">Trip Title</label>
//             <input
//               type="text"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               className="mt-1 w-full border px-4 py-2 rounded-md"
//               placeholder="e.g., Summer in Spain"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 font-medium">Destination</label>
//             <PlaceSearch onSelect={handlePlaceSelect} />
//             {destination && (
//               <p className="text-sm text-gray-600 mt-1">Selected: {destination}</p>
//             )}
//           </div>

//           {coordinates && (
//             <MapView lat={coordinates.lat} lon={coordinates.lon} />
//           )}

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-gray-700 font-medium">Start Date</label>
//               <input
//                 type="date"
//                 value={startDate}
//                 onChange={(e) => setStartDate(e.target.value)}
//                 className="mt-1 w-full border px-4 py-2 rounded-md"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-gray-700 font-medium">End Date</label>
//               <input
//                 type="date"
//                 value={endDate}
//                 onChange={(e) => setEndDate(e.target.value)}
//                 className="mt-1 w-full border px-4 py-2 rounded-md"
//                 required
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-gray-700 font-medium">Description</label>
//             <textarea
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               className="mt-1 w-full border px-4 py-2 rounded-md"
//               rows="4"
//               placeholder="Optional description"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className= "w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
//           >
//             {loading ? 'Creating...' : 'Create Trip'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateTrip;
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import PlaceSearch from '../components/PlaceSearch';
import MapView from '../components/MapView';

const CreateTrip = () => {
  
  const [title, setTitle] = useState('');
  const [destination, setDestination] = useState('');
  const [coordinates, setCoordinates] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();

  
  const handlePlaceSelect = (place) => {
    setDestination(place.display_name);
    setCoordinates({
      lat: parseFloat(place.lat),
      lng: parseFloat(place.lon),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !destination || !startDate || !endDate) {
      alert('Please fill all required fields.');
      return;
    }
    if (new Date(endDate) < new Date(startDate)) {
  alert("End date can't be before start date.");
  return; 
}


    try {
      setLoading(true);
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: 'https://dev-0ogi62ybd1xflev7.us.auth0.com/api/v2/',
        },
      });
           console.log("📤 Sending trip data:", {
  title,
  destination,
  startDate,
  endDate,
  description,
  coordinates,
});


      const response = await axios.post(
        
        `${import.meta.env.VITE_API_URL}/api/trips`,
   
        {
          tripName: title,
          destination,
          coordinates,
          startDate,
          endDate,
          description,

        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        alert('Trip created successfully!');
        navigate('/dashboard');
      } else {
        alert('Something went wrong.');
      }
    } catch (error) {
      console.error(error);
      alert('Failed to create trip.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6 flex justify-center items-start">
      <div className="w-full max-w-xl bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Create a New Trip</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium">Trip Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 w-full border px-4 py-2 rounded-md"
              placeholder="e.g., Summer in Spain"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Destination</label>
            <PlaceSearch onSelect={handlePlaceSelect} />
            {destination && (
              <p className="text-sm text-gray-600 mt-1">Selected: {destination}</p>
            )}
          </div>

          {coordinates && (
            <MapView location={coordinates} />
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="mt-1 w-full border px-4 py-2 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="mt-1 w-full border px-4 py-2 rounded-md"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 w-full border px-4 py-2 rounded-md"
              rows="4"
              placeholder="Optional description"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Trip'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTrip;
