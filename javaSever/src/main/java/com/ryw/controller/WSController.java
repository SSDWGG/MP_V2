package com.ryw.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/api/test")
public class WSController {

    @Autowired
    private TestServiceImpl testServiceImpl;
    /**
     * 启动页面
     * @return
     */
    @GetMapping("/start")
    public String start(){
        return "index";
    }

    @PostMapping("/pushToWeb")
    public String pushToWeb(){
//@RequestBody CodesInfo info
        testServiceImpl.printTime();
        return "pushweb";
    }

}

