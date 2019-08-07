<template>
  <div class="homePageBanner">
     <el-button type="primary" @click="AddBanner">添加导航</el-button>
	 <div class="homePageBanner_select">
		 <el-select v-model="value" placeholder="请选择">
			<el-option
			  v-for="item in options"
			  :key="item.value"
			  :label="item.label"
			  :value="item.value">
			</el-option>
		 </el-select>
		 <!-- <el-input v-model="input" placeholder="请输入名称" style="display:inline-block;width:20%;margin-left:10px"></el-input>-->
		 <el-button type="primary" style="margin-left:10px" @click="SelectSearch">搜索</el-button>
	 </div>
	 <div class="homePageBanner_table">
	    <el-table
			:data="tableData"
			border
			:header-cell-style="{backgroundColor:'#ccc',color:'#fff'}"
			style="width: 100%;">
			<el-table-column
			  width="150"
			  type="index"
			>
			</el-table-column>
			<el-table-column
			  prop="img"
			  width="180"
			  label="图标"
			>
			  <template slot-scope="scope">
			      <img :src ="imgUploadUrl  + '/' + scope.row.img" style="width:100%;height:100px;display:inline-block;">
			  </template>
			</el-table-column>
			<el-table-column
			  prop="name"
			  label="名称"
			>
			</el-table-column>
			<el-table-column
			  prop="url"
			  label="链接地址"
			 >
			</el-table-column>
			<el-table-column
			  prop="solt"
			  label="排序"
			  width="150"
			 >
			  <template slot-scope="scope">
			      <div style="text-align:center">
				      <span>{{scope.row.solt}}</span>
				  </div>
			  </template>
			</el-table-column>
			<el-table-column
			  prop="isuse"
			  label="是否可用"
			  width="150"
			  >
			   <template slot-scope="scope">
			       <div style="text-align:center">
				       <span v-if="scope.row.isuse == '1'" class="el-icon-check" style="font-size:25px;color:blue"></span>
					   <span v-else class="el-icon-close" style="font-size:25px;color:red"></span>
				   </div>
			   </template>
			</el-table-column>
			<el-table-column
			  fixed="right"
			  label="操作"
			  width="150"
			>
			  <template slot-scope="scope">
				<el-button type="primary" @click="editBannerTaber(scope.row)" size="small">编辑</el-button>
				<!-- Form -->
				<el-button type="danger" @click="removeBannerTaber(scope.row)" size="small">删除</el-button>
			  </template>
			</el-table-column>
        </el-table>
		
        <!-- 表格分页 -->
		<div class="block">
			<el-pagination
			  @size-change="handleSizeChange"
			  @current-change="handleCurrentChange"
			  :current-page="currentPage4"
			  :page-sizes="[10, 20, 40, 60, 80, 100]"
			  :page-size="10"
			  layout="total, sizes, prev, pager, next, jumper"
			  :total="total">
			</el-pagination>
		</div>
		
		
		<el-dialog title="添加导航" :visible.sync="dialogFormVisible" @close="dialogClose">
			  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				  <el-form-item label="名称" prop="name">
					<el-input v-model="ruleForm.name" placeholder="请输入名称"></el-input>
				  </el-form-item>
				  <el-form-item label="链接" prop="url">
                    <el-input v-model="ruleForm.url" placeholder="请输入链接"></el-input>
				  </el-form-item>
				  <el-form-item label="图片" prop="img">
					 <el-upload
					  class="avatar-uploader"
					  :action="imgUploadUrlTwo + '/api/Tab/upload'"
					  :show-file-list="false"
					  :before-upload="beforeBannerUpload"
					  :on-success="imgUploadSuccess"
					  :on-error="imgUploadError">
					  <img v-if="ruleForm.img" :src="imgUploadUrl + '/' + ruleForm.img" class="avatar">
					  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				  </el-form-item>
				  <el-form-item label="排序" prop="solt">
                    <el-input v-model="ruleForm.solt"></el-input>
				  </el-form-item>
				  <el-form-item label="是否可用" prop="isuse">
					<el-radio-group v-model="ruleForm.isuse">
					  <el-radio label="1">显示</el-radio>
					  <el-radio label="0">隐藏</el-radio>
					</el-radio-group>
				  </el-form-item>
				  
				  <el-form-item>
					<el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
				  </el-form-item>
			  </el-form>
			  <div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
			  </div>
         </el-dialog>
	 </div>
  </div>
</template>

<script>

export default {
  inject: ['reload'],
  name: 'HomePageNavigationBar',
  data() {
     return {
	   //  请输入名称数据
	   input: '',
	   
	   //  下拉框数据
	    options: [{
          value: '2',
          label: '显示全部'
        }, {
          value: '1',
          label: '显示可用'
        }, {
          value: '0',
          label: '显示不可用'
        }],
        value: '2',
		
		//  添加导航栏状态
		dialogFormVisible: false,
		ruleForm: {
          name: '',
          img: '',
          url: '',
          solt: 0,
          isuse: '1',
        },
        rules: {
          name: [
            { required: true, message: '请输入名称', trigger: 'blur' },
            { min: 3, message: '长度最小为 3 个字符', trigger: 'blur' }
          ],
          flag: [
            { isuse: true, message: '请选择是否可用', trigger: 'change' }
          ],

        },
		
		//  导航栏表格数据
		tableData: [],
		imgUploadUrl: this.$store.state.login.imgUploadUrl , //表格图片前缀
		imgUploadUrlTwo: this.$store.state.login.imgUploadUrlTwo,
		
		//分页数据
		currentPage4: 1,   //初始页码
		total: 0,          //总共多少条数据
		pageNum: 1,        //页码
		dataTotalNum: 10,  //一页显示多少条数据
		pageFlag: true,
	 }
  },
  methods: {
     AddBanner() {   //添加导航事件
	    var that = this;
		    this.dialogFormVisible = true;
	 },
	 SelectSearch() {   //下拉框搜索事件
	    var that = this; 		  

			var loading = that.$loading({
			  lock: true,
			  text: 'Loading',
			  spinner: 'el-icon-loading',
			  background: 'rgba(0, 0, 0, 0.7)'
			});
			
			that.$axios('/api/Tab/getTab','GET',{page: that.pageNum,rows: that.dataTotalNum, isuse: that.value}).then(function(res){
				that.tableData = res.data.items;
				that.total = res.data.total;
				loading.close();
			}).catch(function(err){
				loading.close();
				console.log('首页导航栏下拉框选项数据状态时加载失败: ' + err);
				that.$message.error('首页导航栏下拉框选项数据状态时加载失败');
			});
	 },
	 editBannerTaber(row) {  //导航表格编辑事件
         var that = this;
         
			 that.ruleForm = JSON.parse(JSON.stringify(row));   //克隆对象
			 that.dialogFormVisible = true;
	 },
	 removeBannerTaber(row) {  //导航表格删除事件
	   var that = this;
		   that.$confirm('此操作将永久删除, 是否继续?', '提示', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				  type: 'warning'
				}).then(() => {
				   
                  that.$axios('/api/Tab/removTab','GET',{id: row.id}).then(function(res){
						that.reload();
						}).catch(function(err){
						console.log('首页导航栏表格删除时失败: ' + err);
						that.$message.error('首页导航栏表格删除时失败');
					 });				   
				
				}).catch(() => {
				  this.$message({
					type: 'info',
					message: '已取消删除'
				  });          
		     });
	 },
	 dialogClose() {    //dia弹窗点击 关闭事件
	    var that = this;
	        
			that.ruleForm = { name: '', url: '',img: '', solt: 0, isuse: '1'};
	 },
	 handleSizeChange(val) {   //点击每页多少条数据触发事件
	 
	    var that = this;
		that.dataTotalNum = val;
        if(!that.pageFlag) return;
		that.pageFlag = false;
		setTimeout(function(){
	     	that.handlePageAxiosRequest();
		},0);
      },
     handleCurrentChange(val) {    //点击页码触发事件
	   
	    //这里当上面点击每页多少条数据触发事件后，如果页码小于之前的就会触发，所以一次会有两个事件触发(上面和这里)
		var that = this;
		that.pageNum = val;
		if(!that.pageFlag) return;
		that.pageFlag = false;
		setTimeout(function(){
	     	that.handlePageAxiosRequest();
		},0);
      },
	 handlePageAxiosRequest(){     //分页请求数据
          
        var that = this; 		  
		var loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
		
	    that.$axios('/api/Tab/getTab','GET',{page: that.pageNum,rows: that.dataTotalNum,isuse: that.value}).then(function(res){
		    that.tableData = res.data.items;
			that.total = res.data.total;
			that.pageFlag = true;
			loading.close();
		}).catch(function(err){
		    that.pageFlag = true;
	     	loading.close();
		    console.log(err);
			that.$message.error('首页导航栏分页获取时失败');
		});
	 },
     //  表单方法
	 submitForm(formName) {     //form提交事件
	  var that = this;
		  that.$refs[formName].validate((valid) => {
			  if (valid) {
			  
				that.$axios('/api/Tab/addTab','POST',that.ruleForm).then(function(res){
						that.reload();
						}).catch(function(err){
						console.log('首页导航栏表格编辑时失败: ' + err);
						that.$message.error('首页导航栏表格编辑时失败');
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
	  //  图片上传方法
	  beforeBannerUpload(file) {        //logo
	     var that = this;
		 /*var windowURL = window.URL || window.webkitURL;
		 var dataURL = windowURL.createObjectURL(file);
		 this.ruleForm.imgUrl = dataURL;
		 console.log(dataURL);*/
		/* var a = new FileReader();
			 a.onload = function (e) {  that.ruleForm.imgUrl = e.target.result; }
			 a.readAsDataURL(file);
		 
		 return false;*/

		  var formdata1=new FormData();// 创建form对象
			  formdata1.append('file',file,file.name);
			  that.$axios(that.imgUploadUrlTwo + '/api/Tab/upload','POST',formdata1).then(function(res){

                  that.ruleForm.img = res.data ;
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
	         that.ruleForm.img = response.data ;

	  },
	  //  图片上传失败回调
	  imgUploadError(err) {
	     this.$message.error('图片上传失败');
	  },
  },
  beforeCreate() {
    
  },
  created: function () {
    
	    var that = this; 		  
		var loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
		
	    that.$axios('/api/Tab/getTab','GET',{page: that.pageNum,rows: that.dataTotalNum}).then(function(res){
		    that.tableData = res.data.items;
			that.total = res.data.total;
			loading.close();
		}).catch(function(err){
	     	loading.close();
		    console.log('首页导航栏初始化加载失败: ' + err);
			that.$message.error('首页导航栏初始化加载失败');
		});
  
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.homePageBanner_select{
  margin-top: 15px;
}
.homePageBanner_table{
  margin-top: 20px;
}

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
