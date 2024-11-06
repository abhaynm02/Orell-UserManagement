import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const UserProtect = () => {
  const token = useSelector((state) => state.auth.token);

  return (
    <div>
      {token ? <Outlet /> : <Navigate to="/" />}
    </div>
  );
};

export default UserProtect;
