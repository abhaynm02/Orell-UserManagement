package com.abhaynm.user_login_registration.dto;

import com.abhaynm.user_login_registration.model.Gender;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProfileEditRequest {
    @NotBlank(message = " FirstName is required")
    private String firstName;
    @NotBlank(message = " LastName is required")
    private String lastName;
    @Max(value = 100,message = "Please enter a valid age ")
    @Min(value = 1 ,message = "Please enter a valid age")
    private long age;
    @Size(min = 8, message = "Password must be at least 8 characters long")
    private String phone;
    @NotNull(message = "Gender is required")
    private Gender gender;
}
