package com.abhaynm.user_login_registration.config;

import com.cloudinary.Cloudinary;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
@ConfigurationProperties(prefix = "cloudinary")
@Setter
@Getter
public class CloudinaryConfig {
    private String cloudName;
    private String apiKey;
    private String apiSecret;
    private  boolean secure;

    @Bean
    public Cloudinary cloudinary(){
        Map<String,String>config=new HashMap<>();
        config.put("cloud_name",cloudName);
        config.put("api_key",apiKey);
        config.put("api_secret",apiSecret);
        config.put("secure",String.valueOf(secure));
        return new Cloudinary(config);
    }

}
