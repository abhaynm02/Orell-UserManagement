import React, { useEffect, useState } from "react";
import {
  Camera,
  Pencil,
  Mail,
  Phone,
  User,
  Users,
  MapPin,
  Calendar,
  Loader2,
  X,
} from "lucide-react";
import EditUserModal from "./EditUserModal";
import PasswordChangeModal from "./PasswordChangeModal";
import { updateUserProfile, updateUserProfileImage, userGetProfile } from "../../api/user";
import { toast } from "react-toastify";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  
  const [isImageEditOpen, setIsImageEditOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({ ...user });
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const[isLoading,setIsLoading]=useState(false);

  const [isPasswordChangeOpen, setPasswordChangeOpen] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await userGetProfile();

        if (response.data.data) {
          const userData = response.data.data;
          setUser(userData);
          setEditForm(userData);
        } else {
          console.error("Invalid response structure:", response);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserProfile();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!editForm.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!editForm.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!editForm.userName.trim()) newErrors.userName = "Email is required";
    if (!/^\S+@\S+\.\S+$/.test(editForm.userName))
      newErrors.userName = "Invalid email format";
    if (!editForm.phone.trim()) newErrors.phone = "Phone number is required";
    if (!/^\d{10}$/.test(editForm.phone))
      newErrors.phone = "Phone number must be 10 digits";
    if (!editForm.age || editForm.age < 1)
      newErrors.age = "Please enter a valid age";
    if (!editForm.gender) newErrors.gender = "Please select a gender";
    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async () => {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSaving(true);
    try {
    
      const response=await updateUserProfile(editForm);
      setUser(editForm);
      setSaveSuccess(true);
      
      setTimeout(() => {
        setIsEditModalOpen(false);
        setSaveSuccess(false);
      }, 1000);
      console.log(response)
       toast.success(response.data.message);
    } catch (error) {
      console.error("Error saving details:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleEditPhoto = () => {
    setIsImageEditOpen(true);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(file);
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
    }
  };

  const handleImageUpload = async () => {
    if (!selectedImage) return;

    setIsUploading(true);
    try {
      // Simulated upload delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const formData = new FormData();
      formData.append('profileImage', selectedImage);
      const response =await updateUserProfileImage(formData);
       toast.success("image uplodaded succesfully")
      setUser((prev) => ({
        ...prev,
        profileImageLink: previewUrl,
      }));

      setIsImageEditOpen(false);
      setSelectedImage(null);
      setPreviewUrl(null);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleCloseImageEdit = () => {
    setIsImageEditOpen(false);
    setSelectedImage(null);
    setPreviewUrl(null);
  };

  const handleEditDetails = () => {
    setIsEditModalOpen(true);
    console.log("Edit user details clicked");
  };

  const changePassword=()=>{
    setPasswordChangeOpen(true);
    console.log("password change is open")
  }
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        <span className="ml-2">Loading profile...</span>
      </div>
    );
  }
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-red-500">Error loading profile data</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header Background */}
        <div className="h-48 bg-gradient-to-r from-blue-500 to-blue-600 relative">
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white"></div>
        </div>
              
        <div className="relative px-4 sm:px-6 lg:px-8 pb-8">
          {/* Profile Image */}
          <div className="relative -mt-24 mb-6 flex justify-center sm:justify-start">
            <div className="relative group">
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <img
                  src={user.profileImageLink}
                  alt={`${user.firstName}'s profile`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "/api/placeholder/160/160";
                  }}
                />
              </div>
              <button
                onClick={handleEditPhoto}
                className="absolute bottom-2 right-2 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-lg transform transition-transform hover:scale-110"
                aria-label="Edit profile picture"
              >
                <Camera className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* User Info Section */}
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                  {user.firstName} {user.lastName}
                </h1>
                <p className="text-gray-500 mt-2">{user.userName}</p>
              </div>
              <div className="flex  justify-between">
              <button
                onClick={handleEditDetails}
                className="mt-4 mr-3 sm:mt-0 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 transform transition-transform hover:scale-105 shadow-md"
              >
                <Pencil className="h-5 w-5" />
                Edit Profile
              </button>
              <button
                onClick={changePassword}
                className="mt-4 sm:mt-0 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 transform transition-transform hover:scale-105 shadow-md"
              >
                <Pencil className="h-5 w-5" />
               Change Password 
              </button>
              </div>
            </div>

            {/* Info Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Email Card */}
              <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-gray-900 font-medium">{user.userName}</p>
                  </div>
                </div>
              </div>

              {/* Phone Card */}
              <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="text-gray-900 font-medium">{user.phone}</p>
                  </div>
                </div>
              </div>

              {/* Age Card */}
              <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <Calendar className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Age</p>
                    <p className="text-gray-900 font-medium">
                      {user.age} years
                    </p>
                  </div>
                </div>
              </div>

              {/* Gender Card */}
              <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="bg-orange-100 p-3 rounded-lg">
                    <Users className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Gender</p>
                    <p className="text-gray-900 font-medium">{user.gender}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <EditUserModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        formData={editForm}
        onChange={handleInputChange}
        onSubmit={handleSubmit}
        errors={errors}
        isSaving={isSaving}
        saveSuccess={saveSuccess}
      />

      <PasswordChangeModal isOpen={isPasswordChangeOpen} onClose={()=>setPasswordChangeOpen(false)}></PasswordChangeModal>

      {/* Image Edit Modal */}
      {isImageEditOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Update Profile Picture</h3>
              <button
                onClick={handleCloseImageEdit}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Preview Area */}
              <div className="flex justify-center">
                <div className="w-48 h-48 rounded-full overflow-hidden border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center p-4">
                      <Camera className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">No image selected</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Upload Controls */}
              <div className="space-y-4">
                <label className="block">
                  <span className="sr-only">Choose profile photo</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </label>

                <div className="flex gap-4">
                  <button
                    onClick={handleCloseImageEdit}
                    className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleImageUpload}
                    disabled={!selectedImage || isUploading}
                    className="flex-1 py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      "Upload Image"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
