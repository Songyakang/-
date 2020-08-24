<template>
  <div class="forgot-password-panel">
    <div class="form-item">
      <a-input size='large' v-model="form.name" placeholder="请输入登陆账号">
        <a-icon slot="prefix" type="user" />
      </a-input>
    </div>
    <div class="form-item">
      <a-input size='large' v-model="form.password" placeholder="请输入登陆密码">
        <a-icon slot="prefix" type="unlock" />
      </a-input>
    </div>
    <div class="form-item">
      <a-input size='large' v-model="form.password" placeholder="请再次输入登陆密码">
        <a-icon slot="prefix" type="unlock" />
      </a-input>
    </div>
    <div class="tabbar">
      <div @click='$emit("change", {type: 3})'></div>
      <div @click='$emit("change", {type: 1})'>取消</div>
    </div>
    <div class='login-btn'>立即找回</div>
  </div>
</template>

<script>
export default {
  name: 'forgotPassword',
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
      }
    }
  },
  methods: {
    handleSubmit(){
      this.$store.dispatch('user/login',{
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
$fontcolor: #e2e2e2;
.forgot-password-panel{
  .form-item{
    border-bottom: 1px solid $color;
    padding: 5px 0;
    font-size: 16px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .label{
      min-width: 50px;
      color: $fontcolor;
    }
    input{
      border-width: 0;
      outline-width: 0;
      font-size: 16px;
      flex: 1;
      margin-left: 5px;
      background-color: inherit;
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
    border-radius: 50px;
    cursor: pointer;
    text-align: center;
    margin-top: 10px;
    color: $fontcolor;
  }
}
</style>