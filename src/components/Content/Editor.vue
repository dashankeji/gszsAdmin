<template>
	 <div class="edit_container">
			<quill-editor 
				v-model="content" 
				:options="editorOption"
				@blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
				@change="onEditorChange($event)"
				>
			</quill-editor>
			<div style="margin-top:5px">
				<el-button type="primary" @click="printHtml">提交富士本内容</el-button>
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
</template>

<script>

export default {
  name: 'Editor',
  data(){
     return {
            content: '<h1>222</h1>',
			editorContent: '',
            editorOption: {},
            dialogFormVisible: false,
        }
  },
  methods: {
        onEditorReady(editor) { // 准备编辑器
        },
        onEditorBlur(){ }, // 失去焦点事件
        onEditorFocus(){}, // 获得焦点事件
        onEditorChange(){}, // 内容改变事件
        printHtml(){       //打印富士本内容
          alert(this.content);   
        },
		removeHtml(){    //清空富士本内容
		    this.content = '';
		},
		editorHtml(){    //编辑富士本内容
		   var that = this;
           that.dialogFormVisible = true;
		   that.editorContent = this.content;
	
		},
		editorHtmlSave(){
		   var that = this;
		   that.content = this.editorContent;
		   console.log(that.content);
		   that.dialogFormVisible = false;
		}
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

</style>