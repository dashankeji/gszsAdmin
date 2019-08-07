<template>
   <div>
	 <div>
	     在首页的封面
		 <el-upload
					  class="avatar-uploader"
					  :action="imgUploadUrlTwo + '/api/About/upload'"
					  :show-file-list="false"
					  :before-upload="beforeBannerUpload"
					  :on-success="imgUploadSuccess"
		              :on-error="imgUploadError">
					  <img v-if="imgUrl" :src="imgUploadUrl + '/' + imgUrl" class="avatar-aboutWe">
					  <i v-else class="el-icon-plus avatar-uploader-icon-aboutWe"></i>
		</el-upload>
	 </div>
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
				v-model="content" 
				:options="editorOption"
				ref="myQuillEditor"
				@blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
				@change="onEditorChange($event)"
				>
			</quill-editor>
			<div style="margin-top:5px">
				<el-button type="primary" @click="printHtml">提交</el-button>
				<el-button type="danger" @click="removeHtml">清空富士本内容</el-button>
				<el-button type="primary" @click="editorHtml">编辑富士本内容</el-button>
			</div>

			<el-dialog title="编辑富士本内容" :visible.sync="dialogFormVisible">
			  <el-input
				  type="textarea"
				  autosize
				  placeholder="请输入内容"
				  v-model="editorContent ">
			  </el-input>
			  <div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="editorHtmlSave">确 定</el-button>
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

  [{'size': ['10px', '12px', '14px', '16px', '18px', '20px']}],  // custom dropdown
  [{'header': [1, 2, 3, 4, 5, 6, false]}],

  [{'color': []}, {'background': []}],          // dropdown with defaults from theme
  [{'font': []}],
  [{'align': []}],
  ['link', 'image', 'video'],
  ['clean']                                         // remove formatting button
];


export default {
  inject: ['reload'],
  name: 'HomePageAboutWe',
  data(){
     return {
	        //  富士本数据
            content: '<h1>222</h1>',
			editorContent: '',
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
			dialogFormVisible: false,
            //  在首页的封面数据
			imgUrl: '',
			imgUploadUrl: this.$store.state.login.imgUploadUrl,
			imgUploadUrlTwo: this.$store.state.login.imgUploadUrlTwo
        }
  },
  methods: {
        onEditorReady(editor) { // 准备编辑器
        },
        onEditorBlur(){ }, // 失去焦点事件
        onEditorFocus(){}, // 获得焦点事件
        onEditorChange(){}, // 内容改变事件
        printHtml(){       //提交
         // alert(this.content);
		   var that = this; 		  
				var loading = this.$loading({
				  lock: true,
				  text: 'Loading',
				  spinner: 'el-icon-loading',
				  background: 'rgba(0, 0, 0, 0.7)'
				});
				
				that.$axios('/api/About/addsave','POST',{id: 1,img: that.imgUrl,content: that.content}).then(function(res){
					loading.close();
					that.reload();
				}).catch(function(err){
					loading.close();
					console.log('关于我们提交失败: ' + err);
					that.$message.error('关于我们提交失败');
				});
        },
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
		    this.content = '';
		},
		editorHtml(){    //编辑富士本内容
		   var that = this;
           that.dialogFormVisible = true;
		   that.editorContent = this.content;
	
		},
		editorHtmlSave(){    //保存编辑的富士本内容
		   var that = this;
		   that.content = this.editorContent;
		   console.log(that.content);
		   that.dialogFormVisible = false;
		},
		//  图片上传方法
		beforeBannerUpload(file) {      
		     var that = this;
			 /*var a = new FileReader();
			 a.onload = function (e) {  that.imgUrl = e.target.result; }
			 a.readAsDataURL(file);
		 
		     return false;*/
             
			 var formdata1=new FormData();// 创建form对象
			 formdata1.append('file',file,file.name);
			 that.$axios(that.imgUploadUrlTwo + '/api/About/upload','POST',formdata1).then(function(res){
                   that.imgUrl = res.data;
				}).catch(function(err){
				//	loading.close();
					console.log('图片上传失败: ' + err);
					that.$message.error('图片上传失败');
				});
			 return false;
		},
		//  图片上传成功回调
	    imgUploadSuccess(response, file, fileList) {
			 var that = this;
				 that.imgUrl = response.data;

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
		
	    that.$axios('/api/About/index','GET').then(function(res){
		    if(res.data){
				that.imgUrl = res.data[0].img;
				that.content = res.data[0].content;
			}
			loading.close();
		}).catch(function(err){
	     	loading.close();
		    console.log('关于我们初始化加载失败: ' + err);
			that.$message.error('关于我们初始化加载失败');
		});
  
  }
}

</script>


<style>

.edit_container{
  margin-top: 1rem;
}
.quill-editor:not(.bubble) .ql-container,
  .quill-editor:not(.bubble) .ql-container .ql-editor {
    height: 30rem;
    padding-bottom: 1rem;
  }
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="10px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="10px"]::before {
    content: '10px';
    font-size: 10px;
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="12px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="12px"]::before {
    content: '12px';
    font-size: 12px;
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="14px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="14px"]::before {
    content: '14px';
    font-size: 14px;
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="16px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="16px"]::before {
    content: '16px';
    font-size: 16px;
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="18px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="18px"]::before {
    content: '18px';
    font-size: 18px;
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="20px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="20px"]::before {
    content: '20px';
    font-size: 20px;
}
//默认的样式
.ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
    content: '14px';
    font-size: 14px;
}


/* 图片上传 */
  .avatar-uploader-icon-aboutWe {
    font-size: 28px;
    color: #8c939d;
    width: 400px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar-aboutWe {
    width: 400px;
    height: 178px;
    display: block;
  }

</style>