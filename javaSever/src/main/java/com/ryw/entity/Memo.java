package com.ryw.entity;

import com.alibaba.fastjson.annotation.JSONField;
import com.alibaba.fastjson.serializer.ToStringSerializer;
import com.baomidou.mybatisplus.annotation.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class Memo {
    @TableId(type = IdType.ID_WORKER)
    @JSONField(serializeUsing= ToStringSerializer.class)
    private Long memoid;

    //long类型出现前端精度失灵，使用注解转成字符串形式
    @TableId(type = IdType.ID_WORKER)
    @JSONField(serializeUsing= ToStringSerializer.class)
    private Long userid;

    private String cover;
    private String title;
    private String content;




    @TableLogic //逻辑删除注解    (内部进行更新)
    private Integer deleted;
    @Version    //乐观锁注解
    private  Integer version;
    @TableField(fill = FieldFill.INSERT)        //内容自动填充（插入时自动填充时间）
    private Date createTime;
    @TableField(fill = FieldFill.INSERT_UPDATE)//内容自动填充（修改时自动填充时间）
    private Date updateTime;


    //构造类和setget方法 和tostring方法

    public Long getMemoid() {
        return memoid;
    }

    public void setMemoid(Long memoid) {
        this.memoid = memoid;
    }

    public Long getUserid() {
        return userid;
    }

    public void setUserid(Long userid) {
        this.userid = userid;
    }

    public String getCover() {
        return cover;
    }

    public void setCover(String cover) {
        this.cover = cover;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Integer getDeleted() {
        return deleted;
    }

    public void setDeleted(Integer deleted) {
        this.deleted = deleted;
    }

    public Integer getVersion() {
        return version;
    }

    public void setVersion(Integer version) {
        this.version = version;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }
}
