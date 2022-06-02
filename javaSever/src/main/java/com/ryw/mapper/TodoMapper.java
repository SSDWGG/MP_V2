package com.ryw.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.ryw.entity.Todo;
import com.ryw.entity.Users;
import org.springframework.stereotype.Repository;


@Repository
public interface TodoMapper extends BaseMapper<Todo> {

}
