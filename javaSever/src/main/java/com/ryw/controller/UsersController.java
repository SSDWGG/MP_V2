package com.ryw.controller;

import com.alibaba.fastjson.JSON;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.ryw.controller.util.JWTUtils;
import com.ryw.entity.Users;
import com.ryw.hander.MyPasswordEncoder;
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


    @RequestMapping("/v2/user/quickAddUser")         //快速添加账号（无需验证码）
    public String addUser(@RequestBody Users users ){
     HashMap<String, Object> resMap = new HashMap<>();
        //姓名邮箱电话都不得重复
        QueryWrapper<Users> wrapper = new QueryWrapper<>();
        wrapper.eq("username",users.getUsername())
                .or().eq("email",users.getEmail())
                .or().eq("phone",users.getPhone());
        Users userdata = usersMapper.selectOne(wrapper);//字段无重复，可以添加注册用户
        if (userdata == null) {
            //进行密码加密存入数据库
            users.setPassword(MyPasswordEncoder.encode(users.getPassword()));
            users.setAvatar("/rabbit.jpg");
            users.setTitle("初来乍到的新人");
            users.setSignature("在醒着的时间里，追求你认为最有意义的~");
            users.setScrolltip("成功的道路并不拥挤，因为坚持的人并不多。");
             usersMapper.insert(users);
            resMap.put("state", "success");
            return JSON.toJSONString(resMap);
        }
        return null;
    }


    //get 参数放在params里面
    @RequestMapping("/v2/user/login")           //账户登录
    public String userLogin(@RequestParam("username") String username,
                            @RequestParam("password") String password)
    {
        HashMap<String, Object> map = new HashMap<>(); // 自定义要查的条件
        map.put("username",username);
        map.put("password",MyPasswordEncoder.encode(password));
        List<Users> users = usersMapper.selectByMap(map);
        if (!users.isEmpty()) {
            //        正常情况下期望只能检索出一个帐号,存入唯一id
            Map<String, String> payload = new HashMap<>();
            payload.put("userid", users.get(0).getUserid().toString());
            return JWTUtils.getToken(payload);
        }
        return null;
    }


    //验证token，验证通过，返回user的所有信息（做信息过滤）
    @RequestMapping("/v2/user/CurrentUser")
    public Users CurrentUser( HttpServletRequest request)
    {
        try {
            DecodedJWT verify = JWTUtils.verify(request.getHeader("token"));
//          此处可以进行数据筛选返回（筛选掉密码等敏感信息）
            return  usersMapper.selectById(verify.getClaim("userid").asString());
        } catch (Exception e){
            log.info("token异常");
            return null;
        }

    }

    //验证token，验证通过，返回user的所有信息（做信息过滤）
    @RequestMapping("/v2/user/checkhave")
    public List<Users> checkhave(@RequestBody Users users)
    {
        QueryWrapper<Users> wrapper = new QueryWrapper<>();
        HashMap<String,Object> queryMap = new HashMap<>();
        queryMap.put("username",users.getUsername());
        wrapper.allEq(queryMap, false);
        List<Users> usersList = usersMapper.selectList(wrapper);
        return usersList;
    }

    @RequestMapping("/v2/user/updateUser")         //更新user信息（不包括密码（需要加密））
    public String updateUser(@RequestBody Users users){
        if(users.getPassword()!=null){
            users.setPassword(MyPasswordEncoder.encode(users.getPassword()));
        }
        HashMap<String, Object> resMap = new HashMap<>();
        usersMapper.updateById(users);
        resMap.put("state", "success");
        return JSON.toJSONString(resMap);
    }

    @RequestMapping("/v2/user/avatarUpload")            //头像图片上传
    public String avatarUpload(@RequestParam("file") MultipartFile file,
                              HttpServletRequest request){
        String userid = JWTUtils.verify(request.getHeader("token")).getClaim("userid").asString();
        File path = new File("/home/www/MP_V2/dist/avatar"); //项目存放的服务器地址
        if(!path.exists()){
            path.mkdir();
        }
        File tofile = new File(path,userid+"avatar.jpg"); //用id命名
        try {
            file.transferTo(tofile);
//           存入users表中"/avatar/"+userid+"avatar.jpg"
            QueryWrapper<Users> wrapper = new QueryWrapper<>();
            wrapper.eq("userid",Long.parseLong(userid));
            Users users = usersMapper.selectOne(wrapper);
            users.setAvatar("/avatar/"+userid+"avatar.jpg");
            int result= usersMapper.updateById(users);
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
