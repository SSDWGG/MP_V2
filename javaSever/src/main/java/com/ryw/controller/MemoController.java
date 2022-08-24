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
    @Autowired
    UsersMapper usersMapper;


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
             System.out.println(memo);
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


//修改备注图片
    @RequestMapping("/v2/memo/memoCoverUpload")            //备注图片上传
    public String avatarUpload(@RequestParam("file") MultipartFile file,
                               HttpServletRequest request){
        String memoid = request.getHeader("memoid");
        String userid = JWTUtils.verify(request.getHeader("token")).getClaim("userid").asString();
        File path = new File("/home/www/MP_V2/dist/memo"); //图片项目存放的服务器地址
        if(!path.exists()){
            path.mkdir();
        }
        File tofile = new File(path,memoid+"memo.jpg"); //用id命名
        try {
            file.transferTo(tofile);
//           存入users表中"/memo/"+memoid+"memo.jpg"
            QueryWrapper<Memo> wrapper = new QueryWrapper<>();
            wrapper.eq("memoid",Long.parseLong(memoid));
            Memo memo = memoMapper.selectOne(wrapper);
            memo.setCover("/memo/"+memoid+"memo.jpg");
            int result= memoMapper.updateById(memo);
            if(result!=0){
                return "success";
            }
            return "false";
        }catch (IOException e){
            e.printStackTrace();
            return "false";
        }
    }

}


