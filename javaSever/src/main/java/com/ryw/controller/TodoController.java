package com.ryw.controller;

import com.alibaba.fastjson.JSON;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.ryw.entity.Todo;
import com.ryw.entity.Users;
import com.ryw.mapper.TodoMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

@Slf4j
@RestController
public class TodoController {

    @Autowired
    TodoMapper todoMapper;


    @CrossOrigin
    @RequestMapping("/v2/todo/getUserAllTodos")              // 获取指定用户的全部todos
    public String getUserAllTodos(@RequestParam("userid") Long userid ){   //接收传来的参数，这里了封装一个实体类

        QueryWrapper<Todo> wrapper = new QueryWrapper<>();
        wrapper.eq("userid",userid);
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
            SimpleDateFormat dateFormat= new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
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
        todobefore.setRemark(aftertodo.getRemark());
        todobefore.setClassify(aftertodo.getClassify());
        todoMapper.updateById(todobefore);
        HashMap<String, Object> resMap = new HashMap<>();
        resMap.put("state", "success");
        return JSON.toJSONString(resMap);
    }

    @RequestMapping("/v2/todo/updateTodoType")         //改变todo类型  （阻塞）
    public String updateTodoType(@RequestBody Todo todo,@RequestParam("okflag") int okflag){
     todo.setOkflag(okflag);
        todoMapper.updateById(todo);
        HashMap<String, Object> resMap = new HashMap<>();
        resMap.put("state", "success");
        return JSON.toJSONString(resMap);
    }

    @RequestMapping("/v2/todo/getTodoListByQuery")              // 分页查询todo（条件查询）
    public String getTodoListByQuery(@RequestParam("current") int current  ,
                              @RequestParam("pageSize") int pageSize,
                                     @RequestParam("userid") Long userid,
                                     @RequestParam("todotitle") String todotitle,
                                     @RequestParam("okflag") int okflag,
                                     @RequestParam("classify") String classify){
        HashMap<String, Object> resMap = new HashMap<>();
        Page<Todo> page = new Page<>(current, pageSize);
        QueryWrapper<Todo> wrapper = new QueryWrapper<>();
        HashMap<String,Object> queryMap = new HashMap<>();
        queryMap.put("userid",userid);
        queryMap.put("todotitle",todotitle);
        queryMap.put("okflag",okflag);
        queryMap.put("classify",classify);
        wrapper.allEq(queryMap, false);
        todoMapper.selectPage(page, wrapper);
        List<Todo> todoList  = page.getRecords();  //分页查询出的用户数据
        long numbers = page.getTotal();// 总条数
        resMap.put("current",current);
        resMap.put("pageSize",pageSize);
        resMap.put("total",numbers);
        resMap.put("data",todoList);

        return JSON.toJSONString(resMap);
    }

    @RequestMapping("/v2/todo/getTodoListByQuerySort")              // 分页查询todo（条件查询）
    public String getTodoListByQuerySort(
                                     @RequestParam("userid") Long userid,
                                     @RequestParam("todotitle") String todotitle,
                                     @RequestParam("okflag") int okflag,
                                     @RequestParam("classify") String classify){
        HashMap<String, Object> resMap = new HashMap<>();
        QueryWrapper<Todo> wrapper = new QueryWrapper<>();
        HashMap<String,Object> queryMap = new HashMap<>();
        queryMap.put("userid",userid);
        queryMap.put("todotitle",todotitle);
        queryMap.put("okflag",okflag);
        queryMap.put("classify",classify);
        wrapper.allEq(queryMap, false);
       List<Todo>  todoList = todoMapper.selectList(wrapper);
        resMap.put("data",todoList);
        return JSON.toJSONString(resMap);
    }




}
