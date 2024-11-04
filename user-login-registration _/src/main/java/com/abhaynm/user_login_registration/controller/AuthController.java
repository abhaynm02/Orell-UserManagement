package com.abhaynm.user_login_registration.controller;

import com.abhaynm.user_login_registration.dto.AuthRequest;
import com.abhaynm.user_login_registration.dto.AuthResponse;
import com.abhaynm.user_login_registration.dto.RegisterRequest;
import com.abhaynm.user_login_registration.dto.ResponseModel;
import com.abhaynm.user_login_registration.service.AuthenticationService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@AllArgsConstructor
public class AuthController {
    private final AuthenticationService authenticationService;
      @PostMapping("/register")
    public ResponseEntity<ResponseModel<String>> registerUser(@RequestBody @Valid RegisterRequest request){
          //checking if the username is already exists
        if (authenticationService.isEmailExist(request.getEmail())){
            ResponseModel<String>responseModel=new ResponseModel<>("failed","Email Already exists",null);
            return new ResponseEntity<>(responseModel, HttpStatus.CONFLICT);
        }
        authenticationService.register(request);
        ResponseModel<String>responseModel=new ResponseModel<>("Success","Registration successful",null);
        return new ResponseEntity<>(responseModel,HttpStatus.CREATED);
    }
    @PostMapping("/login")
    public ResponseEntity<ResponseModel<AuthResponse>>authenticateUser(@RequestBody @Valid AuthRequest request){
            AuthResponse authResponse = authenticationService.authenticate(request);
            ResponseModel<AuthResponse> responseModel = new ResponseModel<>("success", "Token created", authResponse);
            return new ResponseEntity<>(responseModel, HttpStatus.OK);

    }
}
