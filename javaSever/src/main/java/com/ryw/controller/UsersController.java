package com.ryw.controller;

import com.alibaba.fastjson.JSON;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.ryw.entity.User;
import com.ryw.entity.Users;
import com.ryw.mapper.UsersMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;


@RestController
public class UsersController {

    @Autowired
    UsersMapper usersMapper;


    @CrossOrigin
    @RequestMapping("/user/allUser")              // 分页查询  和全部数据条数
    public String getUserList(@RequestParam("current") int current  ,
                              @RequestParam("pageSize") int pageSize ){   //接收传来的参数，这里了封装一个实体类
        HashMap<String, Object> resMap = new HashMap<>();
        Page<Users> page = new Page<Users>(current,pageSize);
        usersMapper.selectPage(page, null);
        List<Users> usersList  = page.getRecords();  //分页查询出的用户数据
        long numbers = page.getTotal();// 总条数


        resMap.put("total",numbers);
        resMap.put("data",usersList);
        String res = JSON.toJSONString(resMap);
        return res;
    }
    @RequestMapping("/user/quickAddUser")         //快速注册账号
    public String addUser(@RequestParam("username") String username,
                          @RequestParam("password") String password,
                          @RequestParam("email") String email,
                          @RequestParam("phone") String phone,
                          Users users){
        HashMap<String, Object> resMap = new HashMap<>();

        //姓名邮箱电话都不得重复
        QueryWrapper<Users> wrapper = new QueryWrapper<>();
        wrapper.eq("username",username).or().eq("email",email).or().eq("phone",phone);
        Users usertarge = usersMapper.selectOne(wrapper);//字段无重复，可以添加注册用户
        if (usertarge == null) {
            //用户名不重复，可以放入数据库
            users.setUsername(username);
            users.setPassword(password);
            users.setEmail(email);
            users.setAvatar("/rabbit.jpg");
            users.setTitle("User");
            users.setSignature("生命就像一盒巧克力，结果往往出人意料");


             usersMapper.insert(users);
            resMap.put("state", "success");
            String res = JSON.toJSONString(resMap);
            return res;
        }
        resMap.put("state", "false");
        String res = JSON.toJSONString(resMap);
        return res;
    }

}
