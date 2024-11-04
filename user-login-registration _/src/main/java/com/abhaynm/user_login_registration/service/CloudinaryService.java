package com.abhaynm.user_login_registration.service;

import org.springframework.web.multipart.MultipartFile;

public interface CloudinaryService {
    public String uploadImageToCloudinary(MultipartFile image);
}
