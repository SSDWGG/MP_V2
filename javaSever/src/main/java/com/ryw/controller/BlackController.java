package com.ryw.controller;

import com.alibaba.fastjson.JSON;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.ryw.controller.util.JWTUtils;
import com.ryw.entity.Black;
import com.ryw.entity.Memo;
import com.ryw.mapper.BlackMapper;
import com.ryw.mapper.MemoMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;

@Slf4j
@RestController
public class BlackController {

    @Autowired
    BlackMapper blackMapper;
    @CrossOrigin
//    查询是否在黑名单中
    @RequestMapping("/v2/black/getBlackByUserid")
    public String query(@RequestParam("userid") Long userid ){
            QueryWrapper<Black> wrapper = new QueryWrapper<>();
            wrapper.eq("userid",userid);
            Black black = blackMapper.selectOne(wrapper);
            return JSON.toJSONString(black);
    }
//    增
    @RequestMapping("/v2/black/addblack")
    public String addMemo(@RequestBody Black black){
         blackMapper.insert(black);
        HashMap<String, Object> resMap = new HashMap<>();
        resMap.put("state", "success");
        return JSON.toJSONString(resMap);
        }
//    删
    @RequestMapping("/v2/black/deleteBlackByUserid")
    public String deleteMemo(@RequestParam("userid") Long userid){
        QueryWrapper<Black> wrapper = new QueryWrapper<>();
        wrapper.eq("userid",userid);
        Black black = blackMapper.selectOne(wrapper);
        blackMapper.deleteById(black.getBlackid());
        HashMap<String, Object> resMap = new HashMap<>();
        resMap.put("state", "success");
        return JSON.toJSONString(resMap);
    }


}
