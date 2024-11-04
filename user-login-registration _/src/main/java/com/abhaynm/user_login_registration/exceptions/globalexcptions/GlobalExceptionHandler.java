package com.abhaynm.user_login_registration.exceptions.globalexcptions;

import com.abhaynm.user_login_registration.dto.ResponseModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<ResponseModel<String>>handleAuthenticationException(AuthenticationException ex){
        ResponseModel<String>responseModel=new ResponseModel<>("error","Invalid credentials", null);
        return new ResponseEntity<>(responseModel, HttpStatus.UNAUTHORIZED);
    }
    @ExceptionHandler(MethodArgumentNotValidException.class)
       public ResponseEntity<ResponseModel<Map<String,String>>>handleValidationExceptions(MethodArgumentNotValidException ex){
           Map<String,String>errors=new HashMap<>();
           ex.getBindingResult().getAllErrors().forEach(error->{
               String filedName=((FieldError)error).getField();
               String errorMessage=error.getDefaultMessage();
               errors.put(filedName,errorMessage);;
           });
           ResponseModel<Map<String,String>>responseModel=new ResponseModel<>("failed","fill the filed properly",errors);
           return new ResponseEntity<>(responseModel,HttpStatus.BAD_REQUEST);
       }
}
