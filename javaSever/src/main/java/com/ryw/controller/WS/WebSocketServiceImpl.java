package com.ryw.controller.WS;

import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;

@Service
@EnableScheduling
public class WebSocketServiceImpl {

    //打印时间
//    @Scheduled(fixedRate=1000) //x毫秒执行一次
    public  void  printTime(){
        SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm:ss");
        String date = dateFormat.format(new Date());
//        WebSocketServer.sendInfo(date,date);
//        System.out.println(date);
    }

}
