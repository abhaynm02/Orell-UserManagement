import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserLayout from '../layout/UserLayout';
import Register from '../component/Register/Register';
import Login from '../component/Login/Login';
import UserProfile from '../component/userProfile/UserProfile';
import UserProtect from '../protected/UserProtect';

const UserRoutes = () => {
  return (
    <Routes>
      <Route element={<UserLayout />}>
        <Route index element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route element={<UserProtect />}>
          <Route path="/profile" element={<UserProfile />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default UserRoutes;