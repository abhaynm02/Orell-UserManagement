package com.abhaynm.user_login_registration.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PasswordChangeDto {
    private String oldPassword;
    private String newPassword;
}
