<template>
    <div>
        <!-- 图片上传组件辅助-->
        <el-upload
                class="avatar-uploader"
                :action="serverUrl"
                name="img"
                :headers="header"
                :show-file-list="false"
                :on-success="uploadSuccess"
                :on-error="uploadError"
                :before-upload="beforeUpload">
        </el-upload>
        <!--富文本编辑器组件-->
       <el-row v-loading="quillUpdateImg">
        <quill-editor
                v-model="detailContent"
                ref="myQuillEditor"
                :options="editorOption"
        >
        </quill-editor>
       </el-row>
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
]


    export default {
        data() {
            return {
			    imgUploadUrl: this.$store.state.login.imgUploadUrl , //表格图片前缀
		        imgUploadUrlTwo: this.$store.state.login.imgUploadUrlTwo,   //图片上传前缀
                quillUpdateImg: false, // 根据图片上传状态来确定是否显示loading动画，刚开始是false,不显示
                serverUrl: 'https://www.largehill.com/dashan/public/index.php/api/Banner/upload?token=894fbfb2c7934a7e444712d6ba71f467',  // 这里写你要上传的图片服务器地址
                header: {token: sessionStorage.token},  // 有的图片服务器要求请求头需要有token之类的参数，写在这里
                detailContent: '', // 富文本内容
			    editorOption: {
				  placeholder: '',
				  theme: 'snow',  // or 'bubble'
				  modules: {
					toolbar: {
					  container: toolbarOptions,  // 工具栏
					  handlers: {
						'image': function (value) {
						  if (value) {

							document.querySelector('.avatar-uploader input').click()
						  } else {
							this.quill.format('image', false);
						  }
						}
					  }
					}
				  }
				}
            }
        },
        methods: {
            // 上传图片前
            beforeUpload(file) {
			   // 显示loading动画
                this.quillUpdateImg = true;
				console.log(111);
				 var that = this;
				 var formdata1=new FormData();// 创建form对象
					  formdata1.append('file',file,file.name);
					  that.$axios(that.imgUploadUrlTwo + '/api/Banner/upload','POST',formdata1).then(function(res){
					  console.log(2222);
					   let quill = that.$refs.myQuillEditor.quill     
						   // 获取光标所在位置
                    let length = quill.getSelection().index;
                    // 插入图片  res.info为服务器返回的图片地址
                    quill.insertEmbed(length, 'image', that.imgUploadUrl + '/' + res.data);
                    // 调整光标到最后
                    quill.setSelection(length + 1)
							
						   
						   that.quillUpdateImg = false;
						}).catch(function(err){
							that.quillUpdateImg = false;
							console.log('图片上传失败: ' + err);
							that.$message.error('图片上传失败');
						});
				 return false;
			},
            // 上传图片成功
            uploadSuccess(res, file) {
			  
			    // res为图片服务器返回的数据
                // 获取富文本组件实例
                let quill = this.$refs.myQuillEditor.quill
                // 如果上传成功
                if (res.code === '200' && res.info !== null) {
                    // 获取光标所在位置
                    let length = quill.getSelection().index;
                    // 插入图片  res.info为服务器返回的图片地址
                    quill.insertEmbed(length, 'image', res.info)
                    // 调整光标到最后
                    quill.setSelection(length + 1)
                } else {
                    this.$message.error('图片插入失败')
                }
                // loading动画消失
                this.quillUpdateImg = false
			
			},
            // 上传图片失败
            uploadError(res, file) {
			    // loading动画消失
                this.quillUpdateImg = false
                this.$message.error('图片插入失败')
			}
        }
    }
</script>