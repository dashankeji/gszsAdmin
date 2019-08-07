<template>
  <div>
    <span>设置顶部广告图</span>
    <el-divider></el-divider>
    <el-upload
		  class="avatar-uploader"
		  :action="imgUploadUrlTwo + '/api/Contact/upload'"
		  :show-file-list="false"
		  :before-upload="beforeBannerUpload"
		  :on-success="imgUploadSuccess"
		  :on-error="imgUploadError">
		  <img v-if="imgUrl" :src="imgUploadUrl + '/' + imgUrl" class="avatar">
		  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
	</el-upload>
	<el-divider></el-divider>
	<div style="background-color:#ccc;height:50px;line-height:50px;border-left:10px solid blue">
	     其他设置请移步，“系统管理”->“基本信息”
	</div>
  </div>
</template>

<script>

export default {
  inject: ['reload'],
  name: 'HomePageAboutWe',
  data(){
     return {
	        //顶部广告图数据
			imgUrl: '',
			imgUploadUrl: this.$store.state.login.imgUploadUrl,
			imgUploadUrlTwo: this.$store.state.login.imgUploadUrlTwo
        }
  },
  methods: {
		//  图片上传方法
		beforeBannerUpload(file) {      
		     /*var that = this;
			 var a = new FileReader();
			 a.onload = function (e) {  that.imgUrl = e.target.result; }
			 a.readAsDataURL(file);
		 
		     return false;*/
			 
		 var that = this;
		  var formdata1=new FormData();// 创建form对象
			  formdata1.append('file',file,file.name);
			  that.$axios(that.imgUploadUrlTwo + '/api/Contact/upload','POST',formdata1).then(function(res){

                   that.reload();
				}).catch(function(err){
					//loading.close();
					console.log('图片上传失败: ' + err);
					that.$message.error('图片上传失败');
				});
			 return false;
		},
		//  图片上传成功回调
		imgUploadSuccess(response, file, fileList) {

			 var that = this;
				 console.log(response);
				 that.reload();

		  },
		  //  图片上传失败回调
		imgUploadError(err) {
			 this.$message.error('图片上传失败');
		  },
	},
  created: function () {
    
	    var that = this; 		  
		var loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
		
	    that.$axios('/api/Contact/index','GET').then(function(res){
		    if(res.data){
		       that.imgUrl = res.data.img;
			}
			loading.close();
		}).catch(function(err){
	     	loading.close();
		    console.log('联系我们初始化加载失败: ' + err);
			that.$message.error('联系我们初始化加载失败');
		});
  
  }
}

</script>


<style>

/* 图片上传 */
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
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

</style>