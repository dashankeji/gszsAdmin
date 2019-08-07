<template>
  <div class="homePageBanner">
     <el-button type="primary" @click="AddBanner">添加产品</el-button>
	 <el-button type="primary" @click="editTopBanner">设置顶部广告图</el-button>
	 <div class="homePageBanner_select">
		 <el-select v-model="value" placeholder="请选择">
			<el-option
			  v-for="item in options"
			  :key="item.value"
			  :label="item.label"
			  :value="item.value">
			</el-option>
		 </el-select>
		 <el-select v-model="valueTwo" placeholder="请选择" style="margin-left:10px">
			<el-option
			  v-for="item in optionsTwo"
			  :key="item.value"
			  :label="item.label"
			  :value="item.value">
			</el-option>
		 </el-select>
		 <!--<el-input v-model="input" placeholder="请输入名称" style="display:inline-block;width:20%;margin-left:10px"></el-input>-->
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
			  label="封面图标"
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
			  prop="ishome"
			  label="在首页显示"
			  width="150"
			  >
			   <template slot-scope="scope">
			       <div style="text-align:center">
				       <span v-if="scope.row.ishome == '1'" class="el-icon-check" style="font-size:25px;color:blue"></span>
					   <span v-else class="el-icon-close" style="font-size:25px;color:red"></span>
				   </div>
			   </template>
			</el-table-column>
			<el-table-column
			  prop="ischan"
			  label="在产品服务显示"
			  width="150"
			  >
			   <template slot-scope="scope">
			       <div style="text-align:center">
				       <span v-if="scope.row.ischan == '1'" class="el-icon-check" style="font-size:25px;color:blue"></span>
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
		
		<el-dialog title="添加产品" :visible.sync="dialogFormVisible">
			  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="160px" class="demo-ruleForm">
				  <el-form-item label="名称" prop="title">
					<el-input v-model="ruleForm.name" placeholder="请输入名称"></el-input>
				  </el-form-item>
				  <!--<el-form-item label="封面图标" prop="imgUrl">
					 <el-upload
					  class="avatar-uploader"
					  :action="imgUploadUrlTwo + '/api/Product/upload'"
					  :show-file-list="false"
					  :before-upload="beforeBannerUpload"
					  :on-success="imgUploadSuccess"
					  :on-error="imgUploadError">
					  <img v-if="ruleForm.imgUrl" :src="ruleForm.imgUrl" class="avatar">
					  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				  </el-form-item>-->
				  <el-form-item label="首页封面图标" prop="homePageImgUrl">
					 <el-upload
					  class="avatar-uploader"
					  :action="imgUploadUrlTwo + '/api/Product/upload'"
					  :show-file-list="false"
					  :before-upload="beforeHomePageBannerUpload"
					  :on-success="imgHomePageUploadSuccess"
					  :on-error="imgHomePageUploadError">
					  <img v-if="ruleForm.img" :src="imgUploadUrl + '/' + ruleForm.img" class="avatar">
					  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				  </el-form-item>
				  <el-form-item label="排序" prop="solt">
                    <el-input v-model="ruleForm.solt"></el-input>
				  </el-form-item>
				  <el-form-item label="内容" prop="content">
                    <div class="edit_container">
					    <!-- 图片上传组件辅助-->
						<el-upload
								class="avatar-uploader-editor"
								:action="imgUploadUrlTwo + '/xx/xx/xx'"
								name="img"
								:show-file-list="false"
								:before-upload="beforeEditorUpload">
						</el-upload>
						
						<quill-editor 
							v-model="ruleForm.content" 
							:options="editorOption"
							ref="myQuillEditor"
							@blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
							@change="onEditorChange($event)"
							>
						</quill-editor>
						<div style="margin-top:5px">
							<el-button type="danger" @click="removeHtml">清空富士本内容</el-button>
							<el-button type="primary" @click="editorHtml">编辑富士本内容</el-button>
						</div>

						<el-dialog title="编辑富士本内容" :visible.sync="dialogFormVisibleTwo" append-to-body>
						  <el-input
							  type="textarea"
							  autosize
							  placeholder="请输入内容"
							  v-model="editorContent ">
						  </el-input>
						  <div slot="footer" class="dialog-footer">
							<el-button @click="dialogFormVisibleTwo = false">取 消</el-button>
							<el-button type="primary" @click="editorHtmlSave">确 定</el-button>
						  </div>
						</el-dialog>
	                 </div>  
				  </el-form-item>
				  <el-form-item label="是否在首页显示" prop="ishome">
					<el-radio-group v-model="ruleForm.ishome">
					  <el-radio label="1">显示</el-radio>
					  <el-radio label="0">隐藏</el-radio>
					</el-radio-group>
				  </el-form-item>
				  <el-form-item label="是否在产品服务显示" prop="ischan">
					<el-radio-group v-model="ruleForm.ischan">
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
		 
		 <el-dialog title="设置顶部广告图" :visible.sync="dialogFormVisibleThree">
		      <el-upload
					  class="avatar-uploader"
					  :action="imgUploadUrlTwo + '/api/Product/topBanner'"
					  :show-file-list="false"
					  :before-upload="beforeTopBannerUpload"
					  :on-success="imgTopUploadSuccess"
					  :on-error="imgTopUploadError">
					  <img v-if="topImgUrl" :src="imgUploadUrl + '/' + topImgUrl" class="avatar">
					  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
			  </el-upload>
		      <div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisibleThree = false">取 消</el-button>
			  </div>
		 </el-dialog>
	 </div>
  </div>
</template>

<script>
// 工具栏配置
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],

  [{'header': 1}, {'header': 2}],               // custom button values
  [{'list': 'ordered'}, {'list': 'bullet'}],
  [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
  [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
  [{'direction': 'rtl'}],                         // text direction

  [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
  [{'header': [1, 2, 3, 4, 5, 6, false]}],

  [{'color': []}, {'background': []}],          // dropdown with defaults from theme
  [{'font': []}],
  [{'align': []}],
  ['link', 'image', 'video'],
  ['clean']                                         // remove formatting button
];

export default {
  inject: ['reload'],
  name: 'HomePageProductServices',
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
          label: '显示在首页可见'
        }, {
          value: '0',
          label: '显示在首页不可见'
        }],
        value: '2',
		//  下拉框2数据
		optionsTwo: [{
          value: '2',
          label: '显示全部'
        }, {
          value: '1',
          label: '显示在产品服务可见'
        }, {
          value: '0',
          label: '显示在产品服务不可见'
        }],
		valueTwo: '2',
		
		//顶部广告图数据
		topImgUrl: '',
		
		//  添加文章状态
		dialogFormVisible: false,
		//  富士本编辑状态
		dialogFormVisibleTwo: false,
		dialogFormVisibleThree: false,
		ruleForm: {
          name: '',
          img: '',
          solt: 0,
		  content: '<h1>1111</h1>',
          ishome: '1',
		  ischan: '1'
        },
        rules: {
          name: [
            { required: true, message: '请输入名称', trigger: 'blur' },
            { min: 3, message: '长度最小为 3 个字符', trigger: 'blur' }
          ],
          homePageFlag: [
            { required: true, message: '请选择首页是否可见', trigger: 'change' }
          ],
          productServicesFlag: [
            { required: true, message: '请选择产品服务是否可见', trigger: 'change' }
          ],

        },
		editorContent: '',  //存储富士本内容来进行编辑
		editorOption: {
			  placeholder: '',
			  theme: 'snow',  // or 'bubble'
			  modules: {
				toolbar: {
				  container: toolbarOptions,  // 工具栏
				  handlers: {
					'image': function (value) {
					  if (value) {

						document.querySelector('.avatar-uploader-editor input').click()
					  } else {
						this.quill.format('image', false);
					  }
					}
				  }
				}
			  }
			},
		
		//  产品表格数据
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
     AddBanner() {   //添加文章事件
	    var that = this;
		    this.dialogFormVisible = true;
	 },
	 editTopBanner() {   //设置顶部广告图事件
	    var that = this;
		    this.dialogFormVisibleThree = true;
	 },
	 SelectSearch() {   //下拉框搜索事件
	     var that = this; 		  

			var loading = that.$loading({
			  lock: true,
			  text: 'Loading',
			  spinner: 'el-icon-loading',
			  background: 'rgba(0, 0, 0, 0.7)'
			});
			
			that.$axios('/api/Product/getProduct','GET',{page: that.pageNum,rows: that.dataTotalNum, ishome: that.value, ischan: that.valueTwo}).then(function(res){
				that.tableData = res.data.items;
				that.total = res.data.total;
				loading.close();
			}).catch(function(err){
				loading.close();
				console.log('产品下拉框选项数据状态时加载失败: ' + err);
				that.$message.error('产品下拉框选项数据状态时加载失败');
			});
	 },
	 editBannerTaber(row) {  //产品表格编辑事件
         var that = this;
              console.log(row);
			 that.ruleForm = JSON.parse(JSON.stringify(row));   //克隆对象
			 that.dialogFormVisible = true;
	 },
	 removeBannerTaber(row) {  //产品表格删除事件
	 	   var that = this;
		   that.$confirm('此操作将永久删除, 是否继续?', '提示', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				  type: 'warning'
				}).then(() => {
				   
                  that.$axios('/api/Product/removProduct','GET',{id: row.id}).then(function(res){
						that.reload();
						}).catch(function(err){
						console.log('产品表格删除时失败: ' + err);
						that.$message.error('产品表格删除时失败');
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
	        
			that.ruleForm = { name: '', content: '<h1>1111</h1>',img: '', solt: 0, ishome: '1', ischan: '1'};
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
		
	    that.$axios('/api/Product/getProduct','GET',{page: that.pageNum,rows: that.dataTotalNum,ishome: that.value,ischan: that.valueTwo}).then(function(res){
		    that.tableData = res.data.items;
			that.total = res.data.total;
			that.pageFlag = true;
			loading.close();
		}).catch(function(err){
		    that.pageFlag = true;
	     	loading.close();
		    console.log(err);
			that.$message.error('首页产品分页获取时失败');
		});
	 },
     //  表单方法
	 submitForm(formName) {     //form提交事件
	    var that = this;
		this.$refs[formName].validate((valid) => {
		  if (valid) {
			
			that.$axios('/api/Product/addProduct','POST',that.ruleForm).then(function(res){
						that.reload();
						}).catch(function(err){
						console.log('产品表格编辑时失败: ' + err);
						that.$message.error('产品表格编辑时失败');
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
	  //  封面图标上传方法
	  beforeBannerUpload(file) {       
	     var that = this;

		 var a = new FileReader();
			 a.onload = function (e) {  that.ruleForm.imgUrl = e.target.result; }
			 a.readAsDataURL(file);
		 
		 return false;
	  },
	  //  首页封面图标上传方法
	  beforeHomePageBannerUpload(file) {
	   /*  var that = this;

		 var a = new FileReader();
			 a.onload = function (e) {  that.ruleForm.homePageImgUrl = e.target.result; }
			 a.readAsDataURL(file);
		 
		 return false;*/
		 
		  var that = this;
		  var formdata1=new FormData();// 创建form对象
			  formdata1.append('file',file,file.name);
			  that.$axios(that.imgUploadUrlTwo + '/api/Product/upload','POST',formdata1).then(function(res){

                  that.ruleForm.img = res.data ;
				}).catch(function(err){
					//loading.close();
					console.log('图片上传失败: ' + err);
					that.$message.error('图片上传失败');
				});
			 return false;			 
	  },
	  //  首页封面图片上传成功回调
	  imgHomePageUploadSuccess(response, file, fileList) {
	     var that = this;
	         that.ruleForm.img = response.data ;

	  },
	  //  首页封面图片上传失败回调
	  imgHomePageUploadError(err) {
	     this.$message.error('首页封面图片上传失败');
	  },
	  //  顶部广告图上传方法
	  beforeTopBannerUpload(file) {
	    /* var that = this;

		 var a = new FileReader();
			 a.onload = function (e) {  that.ruleForm.topImgUrl = e.target.result; }
			 a.readAsDataURL(file);
		 
		 return false;*/

		  var that = this;
		  var formdata1=new FormData();// 创建form对象
			  formdata1.append('file',file,file.name);
			  that.$axios(that.imgUploadUrlTwo + '/api/Product/topBanner','POST',formdata1).then(function(res){

                  that.topImgUrl = res.data ;
				}).catch(function(err){
					//loading.close();
					console.log('图片上传失败: ' + err);
					that.$message.error('图片上传失败');
				});
			 return false;	
	  },  
	  //  顶部广告图片上传成功回调
	  imgTopUploadSuccess(response, file, fileList) {
	     var that = this;
	         that.topImgUrl = response.data ;

	  },
	  //  顶部广告图片上传失败回调
	  imgTopUploadError(err) {
	     this.$message.error('顶部广告图片上传失败');
	  },
	  
	  onEditorReady(editor) { // 准备编辑器
      },
	  onEditorBlur(){ }, // 失去焦点事件
	  onEditorFocus(){}, // 获得焦点事件
	  onEditorChange(){}, // 内容改变事件
	  beforeEditorUpload(file) {   // 富士本点击图片上传后触发 el-upload的本地上传功能
		
		   var that = this;
		   var formdata1=new FormData();// 创建form对象
			   formdata1.append('file',file,file.name);
			   that.$axios(that.imgUploadUrlTwo + '/api/Banner/upload','POST',formdata1).then(function(res){
					 
					let quill = that.$refs.myQuillEditor.quill     
						 // 获取光标所在位置
                    let length = quill.getSelection().index;
						// 插入图片  res.info为服务器返回的图片地址
						quill.insertEmbed(length, 'image', that.imgUploadUrl + '/' + res.data);
						// 调整光标到最后
						quill.setSelection(length + 1)
							
						}).catch(function(err){
							console.log('图片上传失败: ' + err);
							that.$message.error('图片上传失败');
						});
				 return false;
	  },
	  removeHtml(){    //清空富士本内容
		 this.ruleForm.content = '';
	  },
	  editorHtml(){    //编辑富士本内容
	     var that = this;
	     that.dialogFormVisibleTwo = true;
	     that.editorContent = this.ruleForm.content;

	  },
	  editorHtmlSave(){    //保存编辑的富士本内容
	     var that = this;
	     that.ruleForm.content = this.editorContent;

	     that.dialogFormVisibleTwo = false;
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
		
		//产品表格数据请求
	    that.$axios('/api/Product/getProduct','GET',{page: that.pageNum,rows: that.dataTotalNum,ishome: that.value,ischan: that.valueTwo}).then(function(res){
		    that.tableData = res.data.items;
			that.total = res.data.total;
			loading.close();
		}).catch(function(err){
	     	loading.close();
		    console.log('产品表格初始化加载失败: ' + err);
			that.$message.error('产品表格初始化加载失败');
		});
		
		//顶部广告图片数据请求
		that.$axios('/api/Product/getTopbanner','GET').then(function(res){
            that.topImgUrl = res.data.img;
			loading.close();
		}).catch(function(err){
	     	loading.close();
		    console.log('顶部广告图片初始化加载失败: ' + err);
			that.$message.error('顶部广告图片初始化加载失败');
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
/* 富士本 */
.edit_container{
  margin-top: 1rem;
}
.quill-editor:not(.bubble) .ql-container,
  .quill-editor:not(.bubble) .ql-container .ql-editor {
    height: 30rem;
    padding-bottom: 1rem;
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
