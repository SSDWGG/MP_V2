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
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Date;
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



    @RequestMapping("/v2/todo/addTodo")         //用户添加todo
    public String addTodo(@RequestParam("userid") Long userid,@RequestBody Todo todo ){
        if(todo.getSchedule()==0){todo.setOkflag(0); }
        if(todo.getSchedule()>0&&todo.getSchedule()<100){todo.setOkflag(1); }
        if(todo.getSchedule()==100){todo.setOkflag(3); }
        todo.setUserid(userid);
        todoMapper.insert(todo);
        HashMap<String, Object> resMap = new HashMap<>();
        resMap.put("state", "success");
        return JSON.toJSONString(resMap);
    }

    @RequestMapping("/v2/todo/deleteTodo")         //删除todo
    public String deleteTodo(@RequestBody Todo todo){
        todoMapper.deleteById(todo.getTodoid());
        HashMap<String, Object> resMap = new HashMap<>();
        resMap.put("state", "success");
        return JSON.toJSONString(resMap);
    }

    @RequestMapping("/v2/todo/updateTodo")         //修改todo
    public String updateTodoType(@RequestBody Todo aftertodo){



//      先根据id去查询对应的todo，然后在对应的todo上面做修改

       Todo todobefore =  todoMapper.selectById(aftertodo.getTodoid());

//        任务完成
        if(aftertodo.getSchedule()>=100){
            Date date = new Date();
            SimpleDateFormat dateFormat= new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
            todobefore.setInfactendTime(dateFormat.format(date));
            todobefore.setOkflag(3);
        }
//        任务未开始
        else if(aftertodo.getSchedule()<=0){
            todobefore.setInfactendTime(null);
            todobefore.setOkflag(0);
        }
//        任务在进行中
        else{
            todobefore.setInfactendTime(null);
            todobefore.setOkflag(1);
        }

        todobefore.setTodotitle(aftertodo.getTodotitle());
        todobefore.setTododescribe(aftertodo.getTododescribe());
        todobefore.setBeginTime(aftertodo.getBeginTime());
        todobefore.setWantendTime(aftertodo.getWantendTime());
        todobefore.setSchedule(aftertodo.getSchedule());

        System.out.println(todobefore);
        
        todoMapper.updateById(todobefore);
        HashMap<String, Object> resMap = new HashMap<>();
        resMap.put("state", "success");
        return JSON.toJSONString(resMap);
    }

    @RequestMapping("/v2/todo/updateTodoType")         //改变todo类型  （阻塞）
    public String updateTodoType(@RequestBody Todo todo,@RequestParam("okflag") Long okflag){
//        System.out.print(okflag);

        todo.setOkflag(2);
        todoMapper.updateById(todo);
        HashMap<String, Object> resMap = new HashMap<>();
        resMap.put("state", "success");
        return JSON.toJSONString(resMap);
    }
}
