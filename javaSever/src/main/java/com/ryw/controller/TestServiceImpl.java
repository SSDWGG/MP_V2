package com.ryw.controller;

import com.ryw.component.WebSocketServer;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;

@Service
@EnableScheduling
public class TestServiceImpl {

    //打印时间
    @Scheduled(fixedRate=1000) //1000毫秒执行一次
    public  void  printTime(){

        SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm:ss");
        String date = dateFormat.format(new Date());
        WebSocketServer.sendInfo(date,"10");
        System.out.println(date);
    }

}
