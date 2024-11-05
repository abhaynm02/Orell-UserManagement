package com.abhaynm.user_login_registration.service.serviceImp;

import com.abhaynm.user_login_registration.dto.PasswordChangeDto;
import com.abhaynm.user_login_registration.dto.ProfileEditRequest;
import com.abhaynm.user_login_registration.dto.UserProfileDto;
import com.abhaynm.user_login_registration.model.UserEntity;
import com.abhaynm.user_login_registration.repository.UserRepository;
import com.abhaynm.user_login_registration.service.JwtService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
class UserServiceImpTest {
     @InjectMocks
      private UserServiceImp userServiceImp;
     @Mock
    private UserRepository userRepository;
     @Mock
    JwtService jwtService;
     @Mock
     private CloudinaryServiceImp cloudinaryServiceImp;
     @Mock
    private PasswordEncoder passwordEncoder;
    private UserEntity mockUser;
    private static final String MOCK_TOKEN = "Bearer mock-token";
    private static final String MOCK_EMAIL = "test@example.com";

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockUser = new UserEntity();
        mockUser.setEmail(MOCK_EMAIL);
        mockUser.setFirstName("Test");
        mockUser.setLastName("user");
        mockUser.setAge(25);
        mockUser.setPhone("1234567890");
    }

    @Test
    void testFindUserProfile(){
        when(jwtService.extractUsername(anyString())).thenReturn(MOCK_EMAIL);
        when(userRepository.findByEmail(MOCK_EMAIL)).thenReturn(Optional.of(mockUser));
        UserProfileDto profileDto=userServiceImp.findUserProfile(MOCK_TOKEN);
        assertNotNull(profileDto);
        assertEquals("Test",profileDto.getFirstName());
        verify(userRepository, times(1)).findByEmail(MOCK_EMAIL);
    }
    @Test
    void testEditUserDetails(){
        ProfileEditRequest editRequest=new ProfileEditRequest();
        editRequest.setFirstName("Test");
        editRequest.setLastName("user");
        editRequest.setAge(35);
        editRequest.setPhone("9898982340");

        when(jwtService.extractUsername(anyString())).thenReturn(MOCK_EMAIL);
        when(userRepository.findByEmail(MOCK_EMAIL)).thenReturn(Optional.of(mockUser));

        userServiceImp.editUserDetails(MOCK_TOKEN,editRequest);

        verify(userRepository,times(1)).save(mockUser);
        assertEquals("Test",mockUser.getFirstName());
        assertEquals("user",mockUser.getLastName());
    }
    @Test
    void testEditProfileImage(){
        MultipartFile mocKFile =mock(MultipartFile.class);
        when(mocKFile.isEmpty()).thenReturn(false);
        when(jwtService.extractUsername(anyString())).thenReturn(MOCK_EMAIL);
        when(userRepository.findByEmail(MOCK_EMAIL)).thenReturn(Optional.of(mockUser));
        when(cloudinaryServiceImp.uploadImageToCloudinary(mocKFile)).thenReturn("mockImageLInk");
        userServiceImp.editProfileImage(MOCK_TOKEN, mocKFile);
        verify(cloudinaryServiceImp, times(1)).uploadImageToCloudinary(mocKFile);
        verify(userRepository, times(1)).save(mockUser);
        assertEquals("mockImageLInk", mockUser.getProfileImageLink());
    }
    @Test
    void testChangePassword() {
        PasswordChangeDto passwordChangeDto = new PasswordChangeDto("oldPassword", "newPassword");
        when(jwtService.extractUsername(anyString())).thenReturn(MOCK_EMAIL);
        when(userRepository.findByEmail(MOCK_EMAIL)).thenReturn(Optional.of(mockUser));
        when(passwordEncoder.matches("oldPassword", mockUser.getPassword())).thenReturn(true);
        when(passwordEncoder.encode("newPassword")).thenReturn("encodedNewPassword");
        String result = userServiceImp.changePassword(MOCK_TOKEN, passwordChangeDto);
        assertEquals("password updated", result);
        verify(userRepository, times(1)).save(mockUser);
        assertEquals("encodedNewPassword", mockUser.getPassword());
    }
}