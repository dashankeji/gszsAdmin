<template>
  <div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
		  <el-form-item label="网站名称" prop="name" >
			<el-input v-model="ruleForm.name"></el-input>
		  </el-form-item>
		  <el-form-item label="公司名称" prop="companyname">
			<el-input v-model="ruleForm.companyname"></el-input>
		  </el-form-item>
          <el-form-item label="公司地址" prop="address">
			<el-input v-model="ruleForm.address"></el-input>
		  </el-form-item>
		  <el-form-item label="联系方式" prop="phone">
			<el-input v-model="ruleForm.phone"></el-input>
		  </el-form-item>
		  <el-form-item label="手机号码" prop="tel">
			<el-input v-model="ruleForm.tel"></el-input>
		  </el-form-item>
		  <el-form-item label="邮箱" prop="email">
			<el-input v-model="ruleForm.email"></el-input>
		  </el-form-item>
		  <el-form-item label="公司LOGO" prop="logo">
			<el-upload
			  class="avatar-uploader"
			  :action="imgUploadUrlTwo + '/api/System/logo'"
			  :show-file-list="false"
			  :before-upload="beforeLogoUpload"
			  :on-success="imgLogoUploadSuccess"
			  :on-error="imgLogoUploadError">
			  <img v-if="ruleForm.logo" :src="imgUploadUrl + '/' + ruleForm.logo" class="avatar">
			  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
			</el-upload>
		  </el-form-item>
		  <el-form-item label="公众号二维码" prop="qr">
			<el-upload
			  class="avatar-uploader"
			  :action="imgUploadUrlTwo + '/api/System/qr'"
			  :show-file-list="false"
			  :before-upload="beforepublicCodeUpload"
			  :on-success="imgPublicCodeUploadSuccess"
			  :on-error="imgPublicCodeUploadError">
			  <img v-if="ruleForm.qr" :src="imgUploadUrl + '/' + ruleForm.qr" class="avatar">
			  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
			</el-upload>
		  </el-form-item>
		  <el-form-item label="小程序二维码" prop="minappqr">
			<el-upload
			  class="avatar-uploader"
			  :action="imgUploadUrlTwo + '/api/System/minapp'"
			  :show-file-list="false"
			  :before-upload="beforesProceduresCodeUpload"
			  :on-success="imgProceduresCodeUploadSuccess"
			  :on-error="imgProceduresCodeUploadError">
			  <img v-if="ruleForm.minappqr" :src="imgUploadUrl + '/' + ruleForm.minappqr" class="avatar">
			  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
			</el-upload>
		  </el-form-item>
		  
		  <el-form-item>
			<el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
		  </el-form-item>
	  </el-form>
  </div>
</template>

<script>
  export default {
    inject: ['reload'],
    methods: {
	  //  表单方法
	  submitForm(formName) {     //form提交事件
	    var that = this;
			that.$refs[formName].validate((valid) => {
			  if (valid) {
			  
				  that.$axios('/api/System/addSave','POST',that.ruleForm).then(function(res){
								that.reload();
								}).catch(function(err){
								console.log('基本信息保存时失败: ' + err);
								that.$message.error('基本信息保存时失败');
							});
			  } else {
				console.log('error submit!!');
				return false;
			  }
			});
      },
      resetForm(formName) {      //form重置事件
        this.$refs[formName].resetFields();
      },
	  //  公司LOGO图片上传方法
	  beforeLogoUpload(file) {        //logo
	    /* var windowURL = window.URL || window.webkitURL;
	     var dataURL = windowURL.createObjectURL(file);
		 this.ruleForm.corporateLogo = dataURL;*/
		 
		  var that = this;
		  var formdata1=new FormData();// 创建form对象
			  formdata1.append('file',file,file.name);
			  that.$axios(that.imgUploadUrlTwo + '/api/System/logo','POST',formdata1).then(function(res){

                  that.ruleForm.logo = res.data ;
				}).catch(function(err){
				//	loading.close();
					console.log('公司LOGO上传失败: ' + err);
					that.$message.error('公司LOGO上传失败');
				});
			 return false;	
	  },
	  //  公司LOGO上传成功
	  imgLogoUploadSuccess(response, file, fileList) {
	     var that = this;
	         that.ruleForm.logo = response.data ;
	  },
	  //  公司LOGO上传失败
	  imgLogoUploadError() {
	     this.$message.error('公司LOGO上传失败');
	  },
	  //  公众号二维码上传方法
	  beforepublicCodeUpload(file) {   //公众号
	     /*var windowURL = window.URL || window.webkitURL;
	     var dataURL = windowURL.createObjectURL(file);
		 this.ruleForm.publicCode = dataURL;*/
		 
		  var that = this;
		  var formdata1=new FormData();// 创建form对象
			  formdata1.append('file',file,file.name);
			  that.$axios(that.imgUploadUrlTwo + '/api/System/qr','POST',formdata1).then(function(res){

                  that.ruleForm.qr = res.data ;
				}).catch(function(err){
				//	loading.close();
					console.log('公众号二维码上传失败: ' + err);
					that.$message.error('公众号二维码上传失败');
				});
			 return false;	
	  },
	  //  公众号二维码上传成功
	  imgPublicCodeUploadSuccess(response, file, fileList) {
	     var that = this;
	         that.ruleForm.qr = response.data ;
	  },
	  //  公众号二维码上传失败
	  imgPublicCodeUploadError() {
     	  this.$message.error('公众号二维码上传失败');
	  },
	  //  小程序二维码上传方法
	  beforesProceduresCodeUpload(file) {   //小程序
	     /*var windowURL = window.URL || window.webkitURL;
	     var dataURL = windowURL.createObjectURL(file);
		 this.ruleForm.sProceduresCode = dataURL;*/
		 
		  var that = this;
		  var formdata1=new FormData();// 创建form对象
			  formdata1.append('file',file,file.name);
			  that.$axios(that.imgUploadUrlTwo + '/api/System/minapp','POST',formdata1).then(function(res){

                  that.ruleForm.minappqr = res.data ;
				}).catch(function(err){
				 //	loading.close();
					console.log('小程序二维码上传失败: ' + err);
					that.$message.error('小程序二维码上传失败');
				});
			 return false;	
	  },
	  //  小程序二维码上传成功
	  imgProceduresCodeUploadSuccess(response, file, fileList) {
	     var that = this;
	         that.ruleForm.minappqr = response.data ;
	  },
	  //  小程序二维码上传失败
	  imgProceduresCodeUploadError() {
	     this.$message.error('小程序二维码上传失败');
	  }
    },

    data() {
      return {
         ruleForm: {
          name: '',
		  companyname: '',
		  address: '',
		  phone: '',
		  tel: '',
		  email: '',
		  logo: '',
		  qr: '',
		  minappqr: '',
        },
		imgUploadUrl: this.$store.state.login.imgUploadUrl , //图片请求前缀
		imgUploadUrlTwo: this.$store.state.login.imgUploadUrlTwo,
        rules: {
          name: [
            { required: true, message: '请输入网站名称', trigger: 'blur' },
            { min: 2, message: '长度不能小于2字符', trigger: 'blur' }
          ],
          companyname: [
            { required: true, message: '请输入公司名称', trigger: 'blur' },
            { min: 2, message: '长度不能小于2字符', trigger: 'blur' }
          ],
          address: [
            { required: true, message: '请输入公司地址', trigger: 'blur' },
            { min: 5, message: '长度不能小于5字符', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入联系方式', trigger: 'blur' },
            { min: 6, message: '长度不能小于6字符', trigger: 'blur' }
          ],
		  tel: [
            { required: true, message: '请输入手机号码', trigger: 'blur' },
            { min: 6, message: '长度不能小于6字符', trigger: 'blur' }
          ],
          email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            { min: 9, message: '长度不能小于9字符', trigger: 'blur' }
          ],
        }
      }
    },
	created: function () {
    
	    var that = this; 		  
		var loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
		
	    that.$axios('/api/System/index','GET').then(function(res){
		    that.ruleForm = res.data;
			loading.close();
		}).catch(function(err){
	     	loading.close();
		    console.log('基本信息初始化加载失败: ' + err);
			that.$message.error('基本信息初始化加载失败');
		});
  
  }
  }
</script>

<style>
 /*上传图片*/
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 150px;
    height: 150px;
    line-height: 150px;
    text-align: center;
  }
  .avatar {
    width: 150px;
    height: 150px;
    display: block;
  }
</style>