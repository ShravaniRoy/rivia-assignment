import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserTable from './UserTable';
import UserDetails from './UserDetails';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserTable />} />
        <Route path="/user-details/:userId" element={<UserDetails />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
