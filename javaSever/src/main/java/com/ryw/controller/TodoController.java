package com.ryw.controller;

import com.alibaba.fastjson.JSON;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.ryw.controller.util.JWTUtils;
import com.ryw.entity.Todo;
import com.ryw.entity.Users;
import com.ryw.hander.MyPasswordEncoder;
import com.ryw.mapper.TodoMapper;
import com.ryw.mapper.UsersMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
public class TodoController {

    @Autowired
    TodoMapper todoMapper;


    @CrossOrigin
    @RequestMapping("/v2/todo/getUserAllTodos")              // 获取指定用户的全部todos
    public String getUserAllTodos(@RequestParam("userid") Long userid ){   //接收传来的参数，这里了封装一个实体类

        QueryWrapper<Todo> wrapper = new QueryWrapper<>();
        wrapper.eq("userid",1);
        List<Todo> userTodoList  =  todoMapper.selectList(wrapper);
        return JSON.toJSONString(userTodoList);
    }



}
