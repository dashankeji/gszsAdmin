<template>
   <div>
	 <div class="edit_container">
	        <div style="display:flex">
			    <span style="margin-right:5px">内容</span>
				
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
					ref="myQuillEditor"
					:options="editorOption"
					@blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
					@change="onEditorChange($event)"
					>
				</quill-editor>
			</div>
	       
			<div style="padding:20px;padding-left:0">
			    是否显示公司logo
				<el-radio-group v-model="logoFlag">
					<el-radio label="1">显示</el-radio>
					<el-radio label="0">隐藏</el-radio>
				</el-radio-group>
			</div>
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
  name: 'HomePageCompanyProfile',
  data(){
     return {
	        //  富士本数据
            content: '<h1>222</h1>',
			editorContent: '',
			imgUploadUrl: this.$store.state.login.imgUploadUrl , //表格图片前缀
		    imgUploadUrlTwo: this.$store.state.login.imgUploadUrlTwo,   //图片上传前缀
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
			//  是否显示logo状态
			logoFlag: '1'
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
			
			  that.$axios('/api/Company/addsave','POST',{content: that.content, islogo: that.logoFlag}).then(function(res){
					loading.close();
					that.reload();
				}).catch(function(err){
					loading.close();
					console.log('公司简介提交失败: ' + err);
					that.$message.error('公司简介提交失败');
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
		
	    that.$axios('/api/Company/index','GET').then(function(res){
		    if(res.data){
				that.content = res.data.content;
				that.logoFlag = res.data.islogo;
			};

			loading.close();
		}).catch(function(err){
	     	loading.close();
		    console.log('公司简介初始化加载失败: ' + err);
			that.$message.error('公司简介初始化加载失败');
		});
  
  }
}

</script>


<style>

.edit_container{
  margin-top: 1rem;
}
.quill-editor{
  display:inline-block;
  width:95%;
}
.quill-editor:not(.bubble) .ql-container,
  .quill-editor:not(.bubble) .ql-container .ql-editor {
    height: 30rem;
    padding-bottom: 1rem;
  }


</style>