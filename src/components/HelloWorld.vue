<template>
  <div class="hello">
      <a-form-model
        ref="ruleForm"
        :model='form'
        :rules='rules'
        id="components-form-demo-normal-login"
        class="login-form"
      >
        <a-form-model-item prop='name'>
          <a-input
            v-model='form.name'
            placeholder="账号"
          >
            <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-model-item>
        <a-form-model-item prop='password'>
          <a-input
            v-model="form.password"
            type='password'
            placeholder="密码"
          >
            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-model-item>
        <a-form-model-item>
          <a-checkbox v-model='form.remember'>
            记住账号密码
          </a-checkbox>
          <a class="login-form-forgot" href="">
            忘记密码
          </a>
          <a-button type="primary" @click="handleSubmit" class="login-form-button">
            立即登录
          </a-button>
          或者
          <a href="">
            开始注册
          </a>
        </a-form-model-item>
      </a-form-model>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  created(){
    this.form.remember = this.$store.state.user.remember
    if(this.$store.state.user.remember){
      this.form.name = this.$store.state.user.name
      this.form.password = this.$store.state.user.password
    }
  },
  data(){
    return {
      form: {
        name: '',
        password: '',
        remember: false
      },
      rules: {
        name: [{ required: true, message: '请输入您的账号' , trigger: 'blur'}],
        password: [{ required: true, message: '请输入您的密码' , trigger: 'blur'}]
      }
    }
  },
  methods: {
    handleSubmit(){
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$store.dispatch('user/login',{
            ...this.form
          }).then(() => {
            this.$router.push({path: '/about'})
          })
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello{
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-form{
  width: 450px;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 5px;
  box-shadow: 0px 0px 10px #f2f2f2;
}
</style>
