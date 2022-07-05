<template>
  <div style="width: 1920px;height:1080px;display: flex;align-items:center;justify-content:center">
    <el-form :model="form" status-icon :rules="rules" ref="form" label-width="80px" style="height: 600px;width: 400px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">登录</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    name: 'login',
    data() {
      return {
        form: {},
        rules: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ],
        }
      }
    },
    methods: {
      submitForm() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            sessionStorage.setItem('user', this.form.username)
            this.$router.push('/chat')
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm() {
        this.form = null
      }
    },
  }
</script>
<style scoped>

</style>
