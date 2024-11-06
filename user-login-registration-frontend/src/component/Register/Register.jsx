import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../api/user";
import { toast } from "react-toastify";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    let formErrors = {};

    if (!firstname) {
      formErrors.firstname = 'Firstname is required';
    }
    if (!lastname) {
      formErrors.lastname = 'Lastname is required';
    }
    if (!phone.trim()) formErrors.phone = 'Phone number is required';
    else if (!/^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/.test(phone)) formErrors.phone = 'Phone number is invalid';
    if (!email) {
      formErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      formErrors.email = 'Invalid email address';
    }
    if (!password) {
      formErrors.password = 'Password is required';
    } else if (password.length < 8) {
      formErrors.password = 'Password must be at least 8 characters';
    }
    if (!confirmPassword) {
      formErrors.confirmPassword = 'Confirm password is required';
    } else if (password !== confirmPassword) {
      formErrors.confirmPassword = 'Passwords do not match';
    }
    if (!age) {
      formErrors.age = 'Age is required';
    } else if (age < 18) {
      formErrors.age = 'You must be at least 18 years old';
    }
    if (!gender) {
      formErrors.gender = 'Gender is required';
    }
    if (!profilePicture) {
      formErrors.profilePicture = 'Profile picture is required';
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (validate()) {
      const formData = new FormData();
        formData.append('request', new Blob([JSON.stringify({
          firstName: firstname,
          lastName: lastname,
          password:password,
          email: email,
          age: age,
          gender: gender,
          phone: phone
        })], { type: "application/json" }));
        formData.append('profileImage', profilePicture);

        const response =await register(formData);
        console.log(response)
        if(response){
          toast.success("register successfully")
          navigate('/login')
        }
        console.log(formData);
      console.log('Form submitted successfully');
    }
  };


  return (
    <div className="mx-auto flex justify-center items-center sm:grid-cols-2 min-h-screen w-full bg-center bg-cover relative">
    <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-20 z-10">
      <form onSubmit={handleSubmit}>
        <h2 className="text-4xl font-bold text-center py-6">Create Account</h2>
        <p className="text-center text-gray-600 mb-8">Please enter your details below</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="font-semibold mb-2">Firstname</label>
            <input
              onChange={(e) => {
                setFirstname(e.target.value);
                
              }}
              className={`border p-3 rounded-md ${errors.firstname ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-400`}
              type="text"
              placeholder="John"
            />
            {errors.firstname && <p className="text-red-500 text-sm mt-1">{errors.firstname}</p>}
          </div>
          <div className="flex flex-col">
            <label className="font-semibold mb-2">Lastname</label>
            <input
              onChange={(e) => {
                setLastname(e.target.value);
                
              }}
              className={`border p-3 rounded-md ${errors.lastname ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-400`}
              type="text"
              placeholder="Doe"
            />
            {errors.lastname && <p className="text-red-500 text-sm mt-1">{errors.lastname}</p>}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="flex flex-col">
            <label className="font-semibold mb-2">Phone</label>
            <input
              onChange={(e) => {
                setPhone(e.target.value);
               
              }}
              className={`border p-3 rounded-md ${errors.phone ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-400`}
              type="text"
              placeholder="1234567890"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>
          <div className="flex flex-col">
            <label className="font-semibold mb-2">Email</label>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
                
              }}
              className={`border p-3 rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-400`}
              type="email"
              placeholder="john@example.com"
            />
            {errors.email && <p className="text-red-500 text-sm mt -1">{errors.email}</p>}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="flex flex-col">
            <label className="font-semibold mb-2">Password</label>
            <input
              onChange={(e) => {
                setPassword(e.target.value);
                
              }}
              className={`border p-3 rounded-md ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-400`}
              type="password"
              placeholder="Enter your password"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
          <div className="flex flex-col">
            <label className="font-semibold mb-2">Confirm Password</label>
            <input
              onChange={(e) => {
                setConfirmPassword(e.target.value);
               
              }}
              className={`border p-3 rounded-md ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-400`}
              type="password"
              placeholder="Re-enter your password"
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="flex flex-col">
            <label className="font-semibold mb-2">Age</label>
            <input
              onChange={(e) => {
                setAge(e.target.value);
                
              }}
              className={`border p-3 rounded-md ${errors.age ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-400`}
              type="number"
              placeholder="Enter your age"
            />
            {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
          </div>
          <div className="flex flex-col">
            <label className="font-semibold mb-2">Gender</label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="MALE"
                  checked={gender === 'MALE'}
                  onChange={(e) => {
                    setGender(e.target.value);
                    
                  }}
                  className="mr-2"
                />
                Male
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="FEMAlE"
                  checked={gender === 'FEMALE'}
                  onChange={(e) => {
                    setGender(e.target.value);
                   
                  }}
                  className="mr-2"
                />
                Female
              </label>
              
            </div>
            {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="flex flex-col">
            <label className="font-semibold mb-2">Profile Picture</label>
            <label
              htmlFor="profile-picture"
              className="border border-gray-300 p-3 rounded-md cursor-pointer hover:bg-gray-100 transition-colors"
            >
              {profilePicture ? profilePicture.name : 'Choose a file'}
            </label>
            <input
              id="profile-picture"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                setProfilePicture(e.target.files[0]);
               
              }}
            />
            {errors.profilePicture && <p className="text-red-500 text-sm mt-1">{errors.profilePicture}</p>}
          </div>
        </div>
        <div className="flex justify-center mt-10">
          <button
            type="submit"
            className="border font-bold text-white py-3 px-8 bg-green-500 hover:bg-green-600 rounded-xl transition duration-300 text-lg shadow-md"
          >
            Create Account
          </button>
        </div>
        <div className="flex justify-center mt-6">
          <p className="text-gray-600">
            Already have an account?{' '}
            <span className="text-blue-500 hover:text-blue-700 font-semibold cursor-pointer">
              <Link to="/login">Login here</Link>
            </span>
          </p>
        </div>
      </form>
    </div>
  </div>
  );
};

export default Register;
