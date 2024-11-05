package com.abhaynm.user_login_registration.service;

import com.abhaynm.user_login_registration.dto.PasswordChangeDto;
import com.abhaynm.user_login_registration.dto.ProfileEditRequest;
import com.abhaynm.user_login_registration.dto.RegisterRequest;
import com.abhaynm.user_login_registration.dto.UserProfileDto;
import org.springframework.web.multipart.MultipartFile;

public interface UserService {
    UserProfileDto findUserProfile(String token);
    void editUserDetails(String token, ProfileEditRequest request);
    void  editProfileImage(String token, MultipartFile profileImage);
    String changePassword(String token, PasswordChangeDto passwordChangeDto);
}
