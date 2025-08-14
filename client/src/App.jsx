
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import CreateTrip from './pages/CreateTrip';
import TripDetails from './pages/TripDetails';

import Layout from './components/Layout';


const App = () => {
  const { isAuthenticated } = useAuth0();



  return (
    <Routes>
      <Route element={<Layout />}>
    
        <Route path="/" element={<Home />} />

      
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
