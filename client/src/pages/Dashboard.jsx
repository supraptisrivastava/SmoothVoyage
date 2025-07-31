// import React, { useEffect, useState } from "react";
// import { useAuth0 } from "@auth0/auth0-react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import TripCard from "../components/TripCard";
// import Spinner from "../components/Spinner";

// const Dashboard = () => {
//   const { user, isAuthenticated, isLoading } = useAuth0();
//   const API = import.meta.env.VITE_API_URL;
//   console.log("✅ API URL is:", API); // Or your actual base URL if hardcoded
//   const { getAccessTokenSilently } = useAuth0();

//   const [trips, setTrips] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!user?.email) return;

//     const fetchTrips = async () => {
//       try {
//         console.log("API Base URL:", API);
//         const token = await getAccessTokenSilently();
//        const response = await axios.get(`${API}/trips`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//        },
//         });
//         const tripData = Array.isArray(response.data) ? response.data : [];
//         setTrips(tripData);
//       } catch (err) {
//         console.error("❌ Failed to fetch trips:", err);
//         setTrips([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTrips();
//   }, [user]);

//   if (isLoading || loading) {
//     return <Spinner />;
//   }

//   return (
//     <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
//       <Navbar />

//       <main className="flex-1 pt-24 px-6 md:px-12">
//         <h1 className="text-3xl font-bold mb-6">Your Trips</h1>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {Array.isArray(trips) && trips.length > 0 ? (
//             trips.map((trip) => <TripCard key={trip._id} trip={trip} />)
//           ) : (
//             <p className="text-gray-400">No trips found.</p>
//           )}
//         </div>

//         <div className="mt-10">
//           <Link
//             to="/create"
//             className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md shadow-md transition duration-200"
//           >
//             + Create a New Trip
//           </Link>
//         </div>
//       </main>


//     </div>
//   );
// };

// export default Dashboard;

import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TripCard from "../components/TripCard";
import Spinner from "../components/Spinner";

const Dashboard = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0(); // ✅ only once
  const API = import.meta.env.VITE_API_URL;

  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated || !user?.email) return;

    const fetchTrips = async () => {
      try {
        console.log("✅ API Base URL:", API);
        const token = await getAccessTokenSilently();
        const response = await axios.get(`${API}/trips`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const tripData = Array.isArray(response.data) ? response.data : [];
        setTrips(tripData);
      } catch (err) {
        console.error("❌ Failed to fetch trips:", err);
        setTrips([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, [isAuthenticated, user?.email, getAccessTokenSilently, API]); // ✅ Stable dependencies

  if (isLoading || loading) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <Navbar />

      <main className="flex-1 pt-24 px-6 md:px-12">
        <h1 className="text-3xl font-bold mb-6">Your Trips</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(trips) && trips.length > 0 ? (
            trips.map((trip) => <TripCard key={trip._id} trip={trip} />)
          ) : (
            <p className="text-gray-400">No trips found.</p>
          )}
        </div>

        <div className="mt-10">
          <Link
            to="/create-trip"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md shadow-md transition duration-200"
          >
            + Create a New Trip
          </Link>
        </div>
      </main>


    </div>
  );
};

export default Dashboard;
