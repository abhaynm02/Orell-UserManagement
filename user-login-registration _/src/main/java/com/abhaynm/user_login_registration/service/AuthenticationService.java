package com.abhaynm.user_login_registration.service;

import com.abhaynm.user_login_registration.dto.AuthRequest;
import com.abhaynm.user_login_registration.dto.AuthResponse;
import com.abhaynm.user_login_registration.dto.RegisterRequest;
import org.springframework.web.multipart.MultipartFile;

public interface AuthenticationService {
    boolean isEmailExist(String email);
    void register(RegisterRequest request, MultipartFile profileImage);
    AuthResponse authenticate(AuthRequest request);
}
