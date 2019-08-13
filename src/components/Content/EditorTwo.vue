<template>
	 <div class="edit_container">
		 <Editor id="tinymce" v-model="tinymceHtml" :init="init"></Editor>
		 <el-button type="primary" @click="getContent">提交富士本内容</el-button>
	 </div>
</template>

<script>
import tinymce from 'tinymce/tinymce'
import 'tinymce/themes/silver/theme' 
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/plugins/image'
import 'tinymce/plugins/link'
import 'tinymce/plugins/code'
import 'tinymce/plugins/table'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/contextmenu'
import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/colorpicker'
import 'tinymce/plugins/textcolor'
//这里写你自己存放语言包的路径
import '../../assets/langs/zh_CN.js'

import 'tinymce/skins/ui/oxide/skin.css'

export default {
  name: 'EditorTwo',
   data () {
    return {
      tinymceHtml: '请输入内容',
      init: {
	    language: 'zh_CN',
        skin_url: 'tinymce/skins/ui/oxide',
        height: 300,
        plugins: 'link lists image code table colorpicker textcolor wordcount contextmenu',
        toolbar:
          'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat',
        branding: false
      }
    }
  },
    methods:{
        getContent(){
            //content 是文本内容
            console.log(this.tinymceHtml);
        }
    },
    mounted () {
	    alert(111);
        //配置的初始化
        tinymce.init({});
    },
    components: {Editor}
}

</script>

