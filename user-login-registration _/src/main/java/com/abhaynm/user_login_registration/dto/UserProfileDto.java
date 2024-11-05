package com.abhaynm.user_login_registration.dto;

import com.abhaynm.user_login_registration.model.Gender;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserProfileDto {
    private String firstName;
    private String lastName;
    private long age;
    private String userName;
    private String phone;
    private Gender gender;
    private String profileImageLink;
}
