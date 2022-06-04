package com.ryw.controller;

import com.alibaba.fastjson.JSON;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.ryw.controller.util.JWTUtils;
import com.ryw.entity.User;
import com.ryw.entity.Users;
import com.ryw.hander.MyPasswordEncoder;
import com.ryw.mapper.UsersMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.Serializable;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
public class UsersController {

    @Autowired
    UsersMapper usersMapper;


    @CrossOrigin
    @RequestMapping("/v2/user/getAllUser")              // 分页查询  和全部数据条数
    public String getUserList(@RequestParam("current") int current  ,
                              @RequestParam("pageSize") int pageSize ){   //接收传来的参数，这里了封装一个实体类
        HashMap<String, Object> resMap = new HashMap<>();
        Page<Users> page = new Page<>(current, pageSize);
        usersMapper.selectPage(page, null);
        List<Users> usersList  = page.getRecords();  //分页查询出的用户数据
        long numbers = page.getTotal();// 总条数
        resMap.put("total",numbers);
        resMap.put("data",usersList);
        return JSON.toJSONString(resMap);
    }


    @RequestMapping("/v2/user/quickAddUser")         //快速添加账号（无需验证码）
    public String addUser(@RequestBody Users users ){
     HashMap<String, Object> resMap = new HashMap<>();
        //姓名邮箱电话都不得重复
        QueryWrapper<Users> wrapper = new QueryWrapper<>();
        wrapper.eq("username",users.getUsername())
                .or().eq("email",users.getEmail())
                .or().eq("phone",users.getPhone());
        Users userdata = usersMapper.selectOne(wrapper);//字段无重复，可以添加注册用户
        if (userdata == null) {
            //进行密码加密存入数据库
            users.setPassword(MyPasswordEncoder.encode(users.getPassword()));
            users.setAvatar("/rabbit.jpg");
            users.setTitle("developer");
            users.setSignature("生命就像一盒巧克力，结果往往出人意料");
             usersMapper.insert(users);
            resMap.put("state", "success");
            return JSON.toJSONString(resMap);
        }
        return null;
    }


    //get 参数放在params里面
    @RequestMapping("/v2/user/login")           //账户登录
    public String userLogin(@RequestParam("username") String username,
                            @RequestParam("password") String password)
    {
        HashMap<String, Object> map = new HashMap<>(); // 自定义要查的条件
        map.put("username",username);
        map.put("password",MyPasswordEncoder.encode(password));
        List<Users> users = usersMapper.selectByMap(map);
        if (!users.isEmpty()) {
            //        正常情况下期望只能检索出一个帐号,存入唯一id
            Map<String, String> payload = new HashMap<>();
            payload.put("userid", users.get(0).getUserid().toString());
            return JWTUtils.getToken(payload);
        }
        return null;
    }


    //验证token，验证通过，返回user的所有信息（做信息过滤）
    @RequestMapping("/v2/user/CurrentUser")
    public Users CurrentUser(@RequestParam("token") String token)
    {
        try {
            DecodedJWT verify = JWTUtils.verify(token);

            log.info("用户id：[{}]",verify.getClaim("userid").asString());


//          此处可以进行数据筛选返回（筛选掉密码等敏感信息）
            return  usersMapper.selectById(verify.getClaim("userid").asString());
        } catch (Exception e){
            log.info("token异常");
            return null;
        }

    }
}
