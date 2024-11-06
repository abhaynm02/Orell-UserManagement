import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../../redux/AuthSlice';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const token = useSelector((state) => state.auth.token);

  const handleLogout = () => {
    dispatch(logOut());
    navigate('/');

  };

  return (
    <header className="bg-white sticky top-0 z-30 w-full flex h-24 items-center justify-between border-b border-gray-300 p-3 shadow-md md:px-6 lg:px-8">
      <h1 className="text-lg font-bold md:text-xl lg:text-2xl">USER MANAGEMENT</h1>
      {token && (
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          onClick={handleLogout}
        >
          Logout
        </button>
      )}
    </header>
  );
};

export default Header;
