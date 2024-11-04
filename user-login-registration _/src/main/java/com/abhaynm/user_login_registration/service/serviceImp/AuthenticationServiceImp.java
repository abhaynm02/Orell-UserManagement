package com.abhaynm.user_login_registration.service.serviceImp;

import com.abhaynm.user_login_registration.dto.AuthRequest;
import com.abhaynm.user_login_registration.dto.AuthResponse;
import com.abhaynm.user_login_registration.dto.RegisterRequest;
import com.abhaynm.user_login_registration.exceptions.coustomexceptions.UserNameNotFoundException;
import com.abhaynm.user_login_registration.model.Role;
import com.abhaynm.user_login_registration.model.UserEntity;
import com.abhaynm.user_login_registration.repository.UserRepository;
import com.abhaynm.user_login_registration.service.AuthenticationService;
import com.abhaynm.user_login_registration.service.JwtService;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AuthenticationServiceImp implements AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    @Override
    //checking the user is already registered
    public boolean isEmailExist(String email) {
        return userRepository.existsByEmail(email);
    }
   //registering new user to database
    @Override
    public void register(RegisterRequest request) {
        //image uploading and skill adding is pending
        UserEntity user=new UserEntity();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setAge(request.getAge());
        user.setPhone(request.getPhone());
        user.setGender(request.getGender());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.USER);
         //saving user object to the database
        userRepository.save(user);
    }

    @Override
    public AuthResponse authenticate(AuthRequest request) {
        //checking username and  password
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUserName(),
                        request.getPassword()
                )
        );
        //finding the user and creating JWT token for stateless communication
         UserEntity user=userRepository.findByEmail(request.getUserName()).orElseThrow(()->new UserNameNotFoundException("user name is not found"));
         String token=jwtService.generateToken(user);
        return new AuthResponse(user.getFirstName(),token);
    }
}
