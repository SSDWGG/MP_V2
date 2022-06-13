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

public class Todo {


    //long类型出现前端精度失灵，使用注解转成字符串形式
    @TableId(type = IdType.ID_WORKER)
    @JSONField(serializeUsing= ToStringSerializer.class)
    private Long todoid;
    //long类型出现前端精度失灵，使用注解转成字符串形式
    @JSONField(serializeUsing= ToStringSerializer.class)
    private Long userid;
    private String todotitle;
    private String tododescribe;
    private int okflag;
    private String wantendTime;
    private String beginTime;
    private String remark;
    private String infactendTime;
    private String classify;

    private double schedule;

    @TableLogic //逻辑删除注解    (内部进行更新)
    private Integer deleted;

    @Version    //乐观锁注解
    private  Integer version;

    @TableField(fill = FieldFill.INSERT)        //内容自动填充（插入时自动填充时间）
    private Date createTime;
    @TableField(fill = FieldFill.INSERT_UPDATE)//内容自动填充（修改时自动填充时间）
    private Date updateTime;


    //构造类和setget方法 和tostring方法


    public String getClassify() {
        return classify;
    }

    public void setClassify(String classify) {
        this.classify = classify;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public Long getTodoid() {
        return todoid;
    }

    public void setTodoid(Long todoid) {
        this.todoid = todoid;
    }

    public Long getUserid() {
        return userid;
    }

    public void setUserid(Long userid) {
        this.userid = userid;
    }

    public String getTodotitle() {
        return todotitle;
    }

    public void setTodotitle(String todotitle) {
        this.todotitle = todotitle;
    }

    public String getTododescribe() {
        return tododescribe;
    }

    public void setTododescribe(String tododescribe) {
        this.tododescribe = tododescribe;
    }

    public int getOkflag() {
        return okflag;
    }

    public void setOkflag(int okflag) {
        this.okflag = okflag;
    }

    public String getWantendTime() {
        return wantendTime;
    }

    public void setWantendTime(String wantendTime) {
        this.wantendTime = wantendTime;
    }

    public String getBeginTime() {
        return beginTime;
    }

    public void setBeginTime(String beginTime) {
        this.beginTime = beginTime;
    }

    public String getInfactendTime() {
        return infactendTime;
    }

    public void setInfactendTime(String infactendTime) {
        this.infactendTime = infactendTime;
    }

    public double getSchedule() {
        return schedule;
    }

    public void setSchedule(double schedule) {
        this.schedule = schedule;
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
