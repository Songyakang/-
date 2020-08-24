<template>
  <div class="login-panel">
    <div class="form-item">
      <a-input size='large' v-model="form.name" placeholder="请输入登陆账号">
        <a-icon slot="prefix" type="user" />
      </a-input>
    </div>
    <div class="form-item">
      <a-input size='large' v-model="form.password" placeholder="请输入登录密码">
        <a-icon slot="prefix" type="unlock" />
      </a-input>
    </div>
    <a-button size='large' class='login-btn' @click.stop='login'>立即登录</a-button>
    <div class="tabbar">
      <div @click='$emit("change", {type: 3})'>忘记密码</div>
      <div @click='$emit("change", {type: 2})'>注册账号</div>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'login',
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
      }
    }
  },
  methods: {
    login(){
      this.$store.dispatch('user/userlogin',{
        ...this.form
      }).then(() => {
        this.$router.push({path: '/about'})
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
$color: rgba(255, 255, 255, 0.2);
$fontcolor: #555;
.login-panel{
  .form-item{
    border-bottom: 1px solid $color;
    padding: 5px 0;
    font-size: 14px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .label{
      min-width: 50px;
      color: $fontcolor;
    }
  }
  .tabbar{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    div{
      color: $fontcolor;
    }
    div{
      cursor: pointer;
    }
  }
  .login-btn{
    width: 100%;
    padding: 5px;
    box-sizing: border-box;
    background: $color;
    cursor: pointer;
    text-align: center;
    margin-top: 10px;
    color: $fontcolor;
    font-size: 14px;
  }
}
</style>
