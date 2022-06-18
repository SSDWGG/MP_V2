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

public class Black {

    @TableId(type = IdType.ID_WORKER)
    @JSONField(serializeUsing= ToStringSerializer.class)
    private Long blackid;


    @TableId(type = IdType.ID_WORKER)
    @JSONField(serializeUsing= ToStringSerializer.class)
    private Long userid;


    @TableLogic //逻辑删除注解    (内部进行更新)
    private Integer deleted;

    private Date overTime;


    @Version    //乐观锁注解
    private  Integer version;
    @TableField(fill = FieldFill.INSERT)        //内容自动填充（插入时自动填充时间）
    private Date createTime;
    @TableField(fill = FieldFill.INSERT_UPDATE)//内容自动填充（修改时自动填充时间）
    private Date updateTime;


    //构造类和setget方法 和tostring方法


    public Date getOverTime() {
        return overTime;
    }

    public void setOverTime(Date overTime) {
        this.overTime = overTime;
    }

    public Long getBlackid() {
        return blackid;
    }

    public void setBlackid(Long blackid) {
        this.blackid = blackid;
    }

    public Long getUserid() {
        return userid;
    }

    public void setUserid(Long userid) {
        this.userid = userid;
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
