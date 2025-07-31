// // // src/App.jsx
// // import React from "react";
// // import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// // import { Auth0Provider } from "@auth0/auth0-react";

// // import Dashboard from "./pages/Dashboard";
// // import TripDetails from "./pages/TripDetails";
// // import CreateTrip from "./pages/CreateTrip"; // Add this if it exists
// // import Auth from "./pages/Auth";           // Optional
// // import NotFound from "./pages/NotFound";     // Optional

// // const domain = import.meta.env.VITE_AUTH0_DOMAIN;
// // const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
// // const redirectUri = window.location.origin;

// // function App() {
// //   return (
// //     <Auth0Provider
// //       domain={domain}
// //       clientId={clientId}
// //       authorizationParams={{ redirect_uri: redirectUri }}
// //     >
// //         <Routes>
// //           <Route path="/" element={<Dashboard />} />
// //           <Route path="/trips/:id" element={<TripDetails />} />
// //           <Route path="/create-trip" element={<CreateTrip />} />
// //           {/* Optional routes */}
// //           <Route path="/Auth" element={<Auth />} />
// //           <Route path="*" element={<NotFound />} />
// //         </Routes>
// //     </Auth0Provider>
// //   );
// // }

// // export default App;
// // src/App.jsx
// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import Dashboard from "./pages/Dashboard";
// import TripDetails from "./pages/TripDetails";
// import CreateTrip from "./pages/CreateTrip";
// import Auth from "./pages/Auth";
// import NotFound from "./pages/NotFound";

// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<Dashboard />} />
//       <Route path="/trips/:id" element={<TripDetails />} />
//       <Route path="/create-trip" element={<CreateTrip />} />
//       <Route path="/auth" element={<Auth />} />
//       <Route path="*" element={<NotFound />} />
//     </Routes>
//   );
// }

// export default App;
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import CreateTrip from './pages/CreateTrip';
import TripDetails from './pages/TripDetails';

import Layout from './components/Layout';
// import Loading from './components/Loading';

const App = () => {
  const { isAuthenticated } = useAuth0();

  // if (isLoading) return <Loading />;

  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Public Route */}
        <Route path="/" element={<Home />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/create-trip"
          element={isAuthenticated ? <CreateTrip /> : <Navigate to="/" />}
        />
        <Route
          path="/trip/:id"
          element={isAuthenticated ? <TripDetails /> : <Navigate to="/" />}
        />
      </Route>
    </Routes>
  );
};

export default App;
