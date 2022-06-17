package com.ryw.controller;

import com.alibaba.fastjson.JSON;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.ryw.controller.util.JWTUtils;
import com.ryw.entity.Memo;
import com.ryw.entity.Todo;
import com.ryw.entity.Users;
import com.ryw.hander.MyPasswordEncoder;
import com.ryw.mapper.MemoMapper;
import com.ryw.mapper.UsersMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
public class MemoController {

    @Autowired
    MemoMapper memoMapper;
    @CrossOrigin
    @RequestMapping("/v2/memo/getUserAllMemos")
    public String getUserAllMemos(HttpServletRequest request ){
        try {
            DecodedJWT verify = JWTUtils.verify(request.getHeader("token"));
            QueryWrapper<Memo> wrapper = new QueryWrapper<>();
            wrapper.eq("userid",verify.getClaim("userid").asString());
            List<Memo> userMemoList  =  memoMapper.selectList(wrapper);
            return JSON.toJSONString(userMemoList);
        } catch (Exception e){
            log.info("token异常");
            return null;
        }

    }
    @RequestMapping("/v2/memo/getMemoByMemoid")
    public String getMemoByMemoid(@RequestParam("memoid") Long memoid){
            QueryWrapper<Memo> wrapper = new QueryWrapper<>();
            wrapper.eq("memoid",memoid);
             Memo memo = memoMapper.selectOne(wrapper);
        return JSON.toJSONString(memo);
    }

//    增
    @RequestMapping("/v2/memo/addMemo")
    public String addMemo(@RequestBody Memo memo,HttpServletRequest request){
        DecodedJWT verify = JWTUtils.verify(request.getHeader("token"));
        memo.setUserid(Long.valueOf(verify.getClaim("userid").asString()));
         memoMapper.insert(memo);
        HashMap<String, Object> resMap = new HashMap<>();
        resMap.put("state", "success");
        return JSON.toJSONString(resMap);
        }
//    删
    @RequestMapping("/v2/memo/deleteMemoByMemoid")
    public String deleteMemo(@RequestParam("memoid") Long memoid){
        memoMapper.deleteById(memoid);
        HashMap<String, Object> resMap = new HashMap<>();
        resMap.put("state", "success");
        return JSON.toJSONString(resMap);
    }
//    改
    @RequestMapping("/v2/memo/updateMemo")
    public String updateMemo(@RequestBody Memo memo){

        memoMapper.updateById(memo);
        HashMap<String, Object> resMap = new HashMap<>();
        resMap.put("state", "success");
        return JSON.toJSONString(resMap);
    }

}
