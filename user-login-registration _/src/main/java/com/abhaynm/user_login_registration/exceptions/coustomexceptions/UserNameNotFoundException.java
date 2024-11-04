package com.abhaynm.user_login_registration.exceptions.coustomexceptions;

public class UserNameNotFoundException extends RuntimeException{
    public UserNameNotFoundException(String message) {
        super(message);
    }
}
