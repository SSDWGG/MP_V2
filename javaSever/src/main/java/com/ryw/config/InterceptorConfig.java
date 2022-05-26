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
                .addPathPatterns("/qqqq")  // 其他接口token验证
                .addPathPatterns("/wwww")  // 其他接口token验证
                .excludePathPatterns("/user/login");  // 所有用户都放行
    }
}