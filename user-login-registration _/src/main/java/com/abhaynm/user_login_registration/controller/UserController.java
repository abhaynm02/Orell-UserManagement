package com.abhaynm.user_login_registration.controller;

import com.abhaynm.user_login_registration.dto.PasswordChangeDto;
import com.abhaynm.user_login_registration.dto.ProfileEditRequest;
import com.abhaynm.user_login_registration.dto.ResponseModel;
import com.abhaynm.user_login_registration.dto.UserProfileDto;
import com.abhaynm.user_login_registration.service.UserService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/user")
@AllArgsConstructor
public class UserController {
    private final UserService userService;
    @GetMapping("/get/profile")
    public ResponseEntity<ResponseModel<UserProfileDto>>fetchUserProfileDetails(@RequestHeader(name="Authorization") String token){
        ResponseModel<UserProfileDto>userProfile=new ResponseModel<>("Success",
                "user profile fetch successfully",
                userService.findUserProfile(token));
        return new ResponseEntity<>(userProfile,HttpStatus.OK);
    }
    @PostMapping("/update/profile")
    public ResponseEntity<ResponseModel<String>>updateUserPersonalDetails(@RequestHeader(name="Authorization") String token,
                                                                          @Valid @RequestBody ProfileEditRequest request){
        userService.editUserDetails(token,request);
        ResponseModel<String>responseModel=new ResponseModel<>("success","profile details updated successfully",null);
        return new ResponseEntity<>(responseModel,HttpStatus.OK);
    }
    @PostMapping("/update/profile/image")
    public ResponseEntity<ResponseModel<String>>updateUserProfileImage(@RequestHeader(name="Authorization") String token,
                                                                       @RequestPart("profileImage")MultipartFile profileImage){
        userService.editProfileImage(token,profileImage);
        ResponseModel<String>responseModel=new ResponseModel<>("success","profile image updated successfully",null);
        return new ResponseEntity<>(responseModel,HttpStatus.OK);
    }

    @PostMapping("/change/password")
    public ResponseEntity<ResponseModel<String>>changeUserPassword(@RequestHeader(name="Authorization")String token,
                                                                   @Valid @RequestBody PasswordChangeDto passwordChangeDto){
        String resultMessage = userService.changePassword(token, passwordChangeDto);
        ResponseModel<String> responseModel;

        if ("Old password is incorrect".equals(resultMessage)) {
            responseModel = new ResponseModel<>("error", resultMessage, null);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseModel);
        }

        responseModel = new ResponseModel<>("success", resultMessage, null);
        return new ResponseEntity<>(responseModel,HttpStatus.OK);
    }



}
