import Api from "../service/axios"
import authRoutes from "../service/endpoints/AuthEndPoints";
import userRoutes from "../service/endpoints/UserEndPoints";
import errorHandle from "./error";


export const register=async(data)=>{
    try {
        const response=await Api.post(authRoutes.register,data,{
            headers:{
                'Content-Type':'multipart/form-data'
            }
        });
        console.log(response)
        return response;
    } catch (error) {
        return errorHandle(error);
    }
}

export const userLogin=async(data)=>{
    try {
        const response = await Api.post(authRoutes.login,data);
        return response;
    } catch (error) {
        return errorHandle(error);
    }
}

export const userGetProfile=async()=>{
    try {
        const response =await Api.get(userRoutes.getProfile);
        return response;
    } catch (error) {
        return errorHandle(error);
    }
}

export const updateUserProfile=async(data)=>{
    try {
        const response =await Api.post(userRoutes.updateDetails,data);
        return response;
    } catch (error) {
        return errorHandle(error);
    }
}

export const updateUserProfileImage =async(data)=>{
  try {
      const response =await Api.post(userRoutes.updateProfile,data,{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    });
      return response;
  } catch (error) {
    return errorHandle(error);
  }
}

export const updatePassword =async(data)=>{
    try {
        const response =await Api.post(userRoutes.updatePassword,data);
        return response
        
    } catch (error) {
        return errorHandle(error);
    }
}