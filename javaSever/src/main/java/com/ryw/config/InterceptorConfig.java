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
                .excludePathPatterns(
//                        登录注册放行
                        "/v2/user/quickAddUser","/v2/user/login","/v2/user/checkhave",
//                        上传查询放行
                        "/v2/user/avatarUpload","/v2/black/queryByUserid","/v2/memo/memoCoverUpload",
//                        邮箱验证放行
                        "/v2/code/sendEmail","/v2/code/testCode"

                );  // 放行
//                .excludePathPatterns("/**");  // 放行
    }
}