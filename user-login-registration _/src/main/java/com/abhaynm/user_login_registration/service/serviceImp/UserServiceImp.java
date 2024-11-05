package com.abhaynm.user_login_registration.service.serviceImp;

import com.abhaynm.user_login_registration.dto.PasswordChangeDto;
import com.abhaynm.user_login_registration.dto.ProfileEditRequest;
import com.abhaynm.user_login_registration.dto.RegisterRequest;
import com.abhaynm.user_login_registration.dto.UserProfileDto;
import com.abhaynm.user_login_registration.exceptions.coustomexceptions.UserNameNotFoundException;
import com.abhaynm.user_login_registration.model.UserEntity;
import com.abhaynm.user_login_registration.repository.UserRepository;
import com.abhaynm.user_login_registration.service.CloudinaryService;
import com.abhaynm.user_login_registration.service.JwtService;
import com.abhaynm.user_login_registration.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

@Service
@AllArgsConstructor
public class UserServiceImp implements UserService {
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final CloudinaryService cloudinaryService;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserProfileDto findUserProfile(String token) {
        UserEntity user =findUserWhitJwt(token);
        UserProfileDto userProfileDto=new UserProfileDto();
        userProfileDto.setUserName(user.getEmail());
        userProfileDto.setFirstName(user.getFirstName());
        userProfileDto.setLastName(user.getLastName());
        userProfileDto.setAge(user.getAge());
        userProfileDto.setGender(user.getGender());
        userProfileDto.setPhone(user.getPhone());
        userProfileDto.setProfileImageLink(user.getProfileImageLink());
        return userProfileDto;
    }

    @Override
    @Transactional
    public void  editUserDetails(String token, ProfileEditRequest request) {
        UserEntity user=findUserWhitJwt(token);
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setAge(request.getAge());
        user.setPhone(request.getPhone());
        user.setGender(request.getGender());
        userRepository.save(user);

    }

    @Override
    @Transactional
    public void editProfileImage(String token, MultipartFile profileImage) {
        UserEntity user=findUserWhitJwt(token);
        if (profileImage != null && !profileImage.isEmpty()){
            String newImageLink = cloudinaryService.uploadImageToCloudinary(profileImage);
            user.setProfileImageLink(newImageLink);
        }
        userRepository.save(user);
    }

    @Override
    public String changePassword(String token, PasswordChangeDto passwordChangeDto) {
        UserEntity  user=findUserWhitJwt(token);
        if (!passwordEncoder.matches( passwordChangeDto.getOldPassword(),user.getPassword())){
            return "Old password is incorrect";
        }
        user.setPassword(passwordEncoder.encode(passwordChangeDto.getNewPassword()));
        userRepository.save(user);
        return "password updated";
    }

    private UserEntity findUserWhitJwt(String token){
        String userName=jwtService.extractUsername(token.substring(7));
        Optional<UserEntity> user=userRepository.findByEmail(userName);
        if (user.isPresent()){
            return user.get();
        }else {
            throw new UserNameNotFoundException("user not found with this email");
        }

    }
}
