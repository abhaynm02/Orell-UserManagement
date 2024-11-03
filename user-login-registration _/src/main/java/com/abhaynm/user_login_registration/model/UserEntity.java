package com.abhaynm.user_login_registration.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "UserEntity" ,uniqueConstraints =@UniqueConstraint(columnNames = "email"))
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String firstName;
    private String lastName;
    private long age;
    private String email;
    private String password;
    private String phone;
    @Enumerated(value = EnumType.STRING)
    private Gender gender;
}
