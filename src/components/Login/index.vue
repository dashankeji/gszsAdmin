<template>
   <div class="login">
       <div style="text-align:center;font-weight:bold;font-size:28px;margin-bottom:30px">
	      大山科技管理后台
	   </div>
       <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm login-form">
		  <el-form-item prop="username">
			<el-input class="loginInput" v-model="ruleForm.username" placeholder="用户名" prefix-icon="el-icon-user" @keyup.enter.native="EnterKey"></el-input>
		  </el-form-item>
		  <el-form-item prop="password">
			<el-input class="loginInput" type="password" v-model="ruleForm.password" placeholder="密码" prefix-icon="el-icon-goods" @keyup.enter.native="EnterKey"></el-input>
		  </el-form-item>
		  <!--<el-form-item prop="name">
			<el-input class="loginInput" v-model="ruleForm.verificationCode" placeholder="验证码" prefix-icon="el-icon-eleme">
			</el-input>
			<img src="https://ss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=1911544270,2341188671&fm=202&mola=new&crop=v1" style="width:70px;height:40px;position:absolute;right:25%;top:0;" />
		  </el-form-item>-->

		  <el-form-item>
			<el-button class="loginInput" style="background-color:#0092DC;border:1px solid #0092DC;color:#fff" @click="submitForm('ruleForm')">登录</el-button>
		  </el-form-item>
	   </el-form>
   </div>
</template>

<script>
export default {
  name: 'login',
  data() {
      return {
        ruleForm: {
          username: '',
          password: '',
		  verificationCode: ''
        }
      };
    },
  methods: {
      EnterKey() {    //输入框监听按键事件
	     this.submitForm();
	  },
      submitForm() {
        
    	var that = this; 		  
			var loading = this.$loading({
			  lock: true,
			  text: 'Loading',
			  spinner: 'el-icon-loading',
			  background: 'rgba(0, 0, 0, 0.7)'
			});
		   
			that.$axios('/api/user/login','POST',{username: that.ruleForm.username,password: that.ruleForm.password}).then(function(res){
			    loading.close();
			    if(res.code == 200){
				    that.$store.getters.incrementLoginSaveTokenToLocalStoreage(res.data.token);
					that.$store.getters.incrementLoginGetTokenToLocalStoreage();
					return;
				};
				that.$message.error('密码或者用户名错误');
			}).catch(function(err){

				loading.close();
				that.$message.error('登录失败');
			});

	    
      }
    }
  
}
</script>

<style>
.login{
  position:absolute;
  top: 50%;
  left:20%;
  margin-top: -157px;
  width: 60%;
  background-color: #00111C;
  box-shadow:0 0 10px #3FBEEB;
  color: #fff;
  padding-top: 20px;
  padding-bottom: 20px;
}
.login-form{
  margin-left: -100px;
}
.loginInput{
   width: 50%;
   margin: 0 auto;
   display: block;
   font-size: 16px; 
}
</style>