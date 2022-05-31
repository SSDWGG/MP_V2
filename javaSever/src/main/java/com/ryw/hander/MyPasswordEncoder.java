package com.ryw.hander;

import org.springframework.stereotype.Component;
import org.springframework.util.DigestUtils;

@Component
public class MyPasswordEncoder {

    public static String encode(CharSequence rawPassword) {
        return DigestUtils.md5DigestAsHex(rawPassword.toString().getBytes());
    }



    public static boolean matches(CharSequence rawPassword, String encodedPassword) {
        return encodedPassword.equals(DigestUtils.md5DigestAsHex(rawPassword.toString().getBytes()));
    }
}