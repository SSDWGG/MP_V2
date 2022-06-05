package com.ryw.config;

import com.ryw.interceptors.JWTInterceptors;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class InterceptorConfig implements WebMvcConfigurer {

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new JWTInterceptors())
                // 全部开启验证
//                .addPathPatterns("/**")
                .excludePathPatterns(  "/v2/user/quickAddUser","/v2/user/login","/v2/user/checkhave");  // 放行
    }
}