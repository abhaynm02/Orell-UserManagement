import React, { useState } from 'react'
import {  useNavigate } from 'react-router-dom';
import { userLogin } from '../../api/user';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setToken } from '../../redux/AuthSlice';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const validate = () => {
      let formErrors = {};
  
      if (!email) {
        formErrors.email = 'username is required';
      }
      
      if (!password) {
        formErrors.password = 'Password is required';
      } else if (password.length < 8) {
        formErrors.password = 'Password must be at least 8 characters';
      }
      setErrors(formErrors);
      return Object.keys(formErrors).length === 0;
    };
  
    const handleSubmit =async (e) => {
      e.preventDefault();
      if(validate()){
        try {
          const data={
              userName:email,
              password:password
          }
            const response=await userLogin(data);
            if(response.data.data){
              dispatch(setToken(response.data.data.token));
             navigate("/profile")
              toast.success("Successfully login ")
            }
            console.log(response);
        } catch (error) {
          
        }
      }
    };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
    <div className="w-full max-w-md bg-white shadow-md rounded-md p-6">
      <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block mb-2 font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`border p-3 rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-400 w-full`}
            placeholder="Enter your email"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
        
        <div>
          <label htmlFor="password" className="block mb-2 font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`border p-3 rounded-md ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-400 w-full`}
            placeholder="Enter your password"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        <div className="space-y-3 pt-2">
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition-colors"
          >
            Sign in
          </button>
          
          <button
            type="button"
            onClick={() => navigate("/")}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition-colors"
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  </div>
  )
}

export default Login
