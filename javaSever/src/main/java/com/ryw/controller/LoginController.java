package com.ryw.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.auth0.jwt.exceptions.AlgorithmMismatchException;
import com.auth0.jwt.exceptions.SignatureVerificationException;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.ryw.controller.util.JWTUtils;
import com.ryw.entity.User;
import com.ryw.entity.Userinfo;
import com.ryw.entity.Userorder;
import com.ryw.mapper.UserMapper;
import com.ryw.mapper.UserinfoMapper;
import com.ryw.mapper.UserorderMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.*;

@Slf4j
@RestController                             //返回值字符
public class LoginController {
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private UserinfoMapper userinfoMapper;
    @Autowired
    private UserorderMapper userorderMapper;


    @CrossOrigin            //所有方法跨域


    @RequestMapping("/getuserallinfo")           //获取用户所有信息
    public String userLogin(@RequestParam("username") String username,
                            User user, Userinfo userinfo)
    {
        QueryWrapper<User> wrapperuser = new QueryWrapper<>();
        wrapperuser.eq("username",username);
        user = userMapper.selectOne(wrapperuser);
//        System.out.println("============================"+user);
        QueryWrapper<Userinfo> wrapperuserinfo = new QueryWrapper<>();
        wrapperuserinfo.eq("id",user.getId());
        userinfo = userinfoMapper.selectOne(wrapperuserinfo);

        QueryWrapper<Userorder> wrapperuserorder = new QueryWrapper<>();
        wrapperuserorder.eq("id",user.getId());
        List<Userorder> userorderlist = new ArrayList<>();
        userorderlist = userorderMapper.selectList(wrapperuserorder);

        HashMap<String, Object> map = new HashMap<>();
//        System.out.println(user.getId().toString());
        map.put("id",user.getId().toString());
        map.put("username",user.getUsername());
        map.put("password",user.getPassword());
        map.put("email",user.getEmail());
        map.put("createTime",user.getCreateTime());
        map.put("userinfo",userinfo);
        map.put("orderlist",userorderlist);
        String userallinfo_json = JSON.toJSONString(map);
        return userallinfo_json;
    }







    @RequestMapping(value = "/testobj", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    public String testobj(@RequestBody JSONObject jsonParam)
    {
//        System.out.println(jsonParam.toJSONString());
//        String username=jsonParam.get("username").toString();
//        System.out.println("username : " + username);
//        System.out.println("jsonParam : " + jsonParam);
        return "testobj success";
    }

    @RequestMapping("/testobj2")
    public String testobj2(@RequestParam("username") String username)
    {
//        System.out.println("username : " + username);
        return "testobj2 success";
    }

    @RequestMapping("/test")
    public String test()
    {

        Map<String, String> payload = new HashMap<>();
        payload.put("id", "hahahha");
        payload.put("name", "hahahha");
        payload.put("password", "hahahha");
        // 生成jwt令牌
        String token = JWTUtils.getToken(payload);
        log.info("成功！生成token！");
        log.info(token);

        return token;
    }

    @RequestMapping("/qqqq")
    public void qqqq(HttpServletRequest request) {
        Map<String, Object> map = new HashMap<>();
        // 验证令牌  交给拦截器去做
        // 只需要在这里处理自己的业务逻辑
        String token = request.getHeader("token");
        DecodedJWT verify = JWTUtils.verify(token);
        log.info("用户id：[{}]",verify.getClaim("id").asString());
        log.info("用户名字：[{}]",verify.getClaim("name").asString());
        map.put("state", true);
        map.put("msg", "请求成功");
    }
    @RequestMapping("/wwww")
    public void wwww(HttpServletRequest request) {
        Map<String, Object> map = new HashMap<>();
        // 验证令牌  交给拦截器去做
        // 只需要在这里处理自己的业务逻辑
        String token = request.getHeader("token");
        DecodedJWT verify = JWTUtils.verify(token);
        log.info("用户id：[{}]",verify.getClaim("id").asString());
        log.info("用户名字：[{}]",verify.getClaim("name").asString());
        map.put("state", true);
        map.put("msg", "请求成功");
    }
    @RequestMapping("/zzzz")
    public void zzzz(HttpServletRequest request) {
        Map<String, Object> map = new HashMap<>();
        // 验证令牌  交给拦截器去做
        // 只需要在这里处理自己的业务逻辑
        String token = request.getHeader("token");
        DecodedJWT verify = JWTUtils.verify(token);
        log.info("用户id：[{}]",verify.getClaim("id").asString());
        log.info("用户名字：[{}]",verify.getClaim("name").asString());
        map.put("state", true);
        map.put("msg", "请求成功");
    }
}

