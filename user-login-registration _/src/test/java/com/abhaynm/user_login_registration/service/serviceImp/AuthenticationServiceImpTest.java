package com.abhaynm.user_login_registration.service.serviceImp;

import com.abhaynm.user_login_registration.dto.AuthRequest;
import com.abhaynm.user_login_registration.dto.AuthResponse;
import com.abhaynm.user_login_registration.dto.RegisterRequest;
import com.abhaynm.user_login_registration.model.Gender;
import com.abhaynm.user_login_registration.model.UserEntity;
import com.abhaynm.user_login_registration.repository.UserRepository;
import com.abhaynm.user_login_registration.service.JwtService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class AuthenticationServiceImpTest {
    @Mock
    private UserRepository userRepository;
    @Mock
    private PasswordEncoder passwordEncoder;
    @Mock
    private JwtService jwtService;
    @Mock
    private CloudinaryServiceImp cloudinaryServiceImp;
    @Mock
    private  AuthenticationManager authenticationManager;
    @InjectMocks
    private AuthenticationServiceImp authenticationServiceImp;
    @BeforeEach
    void setUp(){
        MockitoAnnotations.openMocks(this);
    }
    @Test
    void  testIsEmailExist(){
        String email ="test@example.com";
        when(userRepository.existsByEmail(email)).thenReturn(true);
        boolean result=authenticationServiceImp.isEmailExist(email);

        assertTrue(result);
        verify(userRepository,times(1)).existsByEmail(email);
    }
    @Test
    void testRegister(){
        RegisterRequest request=new RegisterRequest();
        request.setFirstName("Test");
        request.setLastName("user");
        request.setEmail("testuser@gmail.com");
        request.setAge(28);
        request.setGender(Gender.MALE);
        request.setPassword("password");
        request.setPhone("1234567890");

        MultipartFile profileImage=mock(MultipartFile.class);
        when(profileImage.isEmpty()).thenReturn(false);
        when(profileImage.getOriginalFilename()).thenReturn("profile.jpg");
        when(cloudinaryServiceImp.uploadImageToCloudinary(profileImage)).thenReturn("image-url");
        when(passwordEncoder.encode(request.getPassword())).thenReturn("encoded-password");

        authenticationServiceImp.register(request,profileImage);
        verify(userRepository,times(1)).save(any(UserEntity.class));
        verify(cloudinaryServiceImp,times(1)).uploadImageToCloudinary(profileImage);
    }
    @Test
    void testAuthentication(){
        AuthRequest authRequest=new AuthRequest();
        authRequest.setUserName("testuser@gamil.com");
        authRequest.setPassword("123456789");
        UserEntity user =new UserEntity();
        user.setFirstName("test");
        user.setEmail(authRequest.getUserName());
        when(userRepository.findByEmail(authRequest.getUserName())).thenReturn(Optional.of(user));
        when(jwtService.generateToken(user)).thenReturn("jwt-token");
        AuthResponse authResponse=authenticationServiceImp.authenticate(authRequest);
        assertEquals("test",authResponse.getName());
        assertEquals("jwt-token",authResponse.getToken());
    }

}