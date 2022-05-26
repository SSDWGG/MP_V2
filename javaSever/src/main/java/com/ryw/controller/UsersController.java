package com.ryw.controller;

import com.alibaba.fastjson.JSON;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.ryw.entity.Users;
import com.ryw.mapper.UsersMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;


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


    @RequestMapping("/v2/user/quickAddUser")         //快速注册账（无需验证码）
    public String addUser(@RequestBody Users users ){
        HashMap<String, Object> resMap = new HashMap<>();
        //姓名邮箱电话都不得重复
        QueryWrapper<Users> wrapper = new QueryWrapper<>();
        wrapper.eq("username",users.getUsername())
                .or().eq("email",users.getEmail())
                .or().eq("phone",users.getPhone());
        Users userdata = usersMapper.selectOne(wrapper);//字段无重复，可以添加注册用户
        if (userdata == null) {
            //用户名不重复，注初始值放入数据库
            users.setAvatar("/rabbit.jpg");
            users.setTitle("user");
            users.setSignature("生命就像一盒巧克力，结果往往出人意料");
             usersMapper.insert(users);
            resMap.put("state", "success");
            return JSON.toJSONString(resMap);
        }
        resMap.put("state", "false");
        return JSON.toJSONString(resMap);
    }

}
