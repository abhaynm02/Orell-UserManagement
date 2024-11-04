package com.abhaynm.user_login_registration.service.serviceImp;

import com.abhaynm.user_login_registration.exceptions.coustomexceptions.CloudinaryUploadException;
import com.abhaynm.user_login_registration.service.CloudinaryService;
import com.cloudinary.Cloudinary;
import jakarta.annotation.Resource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
public class CloudinaryServiceImp implements CloudinaryService {
    @Resource
    private Cloudinary cloudinary;
    @Override
    public String uploadImageToCloudinary(MultipartFile image) {
        try {
            HashMap<Object,Object>options=new HashMap<>();
            options.put("folder","profileImages");
            Map uploadFile=cloudinary.uploader().upload(image.getBytes(),options);
            String publicId=(String) uploadFile.get("public_id");
            return cloudinary.url().secure(true).generate(publicId);

        } catch (IOException e) {
            log.error("Error uploading image {}",e.getMessage());
           throw new CloudinaryUploadException("Error uploading image:"+e.getMessage());
        }

    }
}
