<template>
    <div class="rightHead">
	    <el-row type="flex" class="" justify="space-between">
		    <el-radio-group v-model="isCollapse" :fill="this.$store.state.a.bgColor" @change="radioChange">
					 <el-radio-button :label="false">展开</el-radio-button>
					 <el-radio-button :label="true">收起</el-radio-button>
			</el-radio-group>
			<div>
			    <div style="display:inline-block;margin-right:10px">
			        换肤: <el-color-picker v-model="color" size="small" @change="ChangColor"></el-color-picker>
			    </div>
				<div style="display:inline-block">
					<img src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80" width=48 height=48 />
					<!--<p>Element-ul</p>-->
				</div>
				<div style="display:inline-block;margin-left:10px;margin-right:10px">
				    <p class="el-icon-s-custom" style="display:inline-block;font-size:1.3rem">admin</p>
					<el-dropdown @command="handleCommand">
					  <span class="el-dropdown-link">
						  <i class="el-icon-arrow-down el-icon--right" style="font-size:20px"></i>
					  </span>
					  <el-dropdown-menu slot="dropdown">
						<!--<el-dropdown-item command="修改密码">修改密码</el-dropdown-item>-->
						<el-dropdown-item command="退出登录">退出登录</el-dropdown-item>
					  </el-dropdown-menu>
					</el-dropdown>
				</div>
			</div>
	     </el-row>
		 <div> <!--tab标签-->
			<el-tabs v-model="editableTabsValue.name" type="card" closable @edit="handleTabsEdit" @tab-click="TabGoPath" style="">
				  <el-tab-pane
					:key="item.name"
					v-for="(item, index) in editableTabs"
					:label="item.title"
					:name="item.name"
					:path="item.path"						
				  >
				  </el-tab-pane>
			</el-tabs>
		 </div>
		 <!--修改密码弹窗-->
		 <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
		    <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				  <el-form-item label="用户" prop="username">
					<el-input v-model="ruleForm.username" placeholder="用户"></el-input>
				  </el-form-item>
				  <el-form-item label="密码" prop="password">
					<el-input v-model="ruleForm.password" placeholder="密码"></el-input>
				  </el-form-item>
				  <el-form-item label="确认密码" prop="confirmPassword">
					<el-input v-model="ruleForm.confirmPassword" placeholder="确认密码"></el-input>
				  </el-form-item>

				  <el-form-item style="margin-left:-100px">
					<el-button style="width:50%;display:block;margin:0 auto;background-color:#0092DC;border:1px solid #0092DC;color:#fff" @click="submitForm('ruleForm')">提交</el-button>
				  </el-form-item>
	        </el-form>
		 </el-dialog> 
	</div>
</template>

<script>
export default {
  name: 'RightHead',
  data() {
      return {
	     //换肤数据
	     color: '#409EFF',
		 //展开或关闭数据
	     isCollapse: this.$store.state.a.isCollapse,
		 //当前选中的tab标签数据(标签高亮效果)
	     editableTabsValue: this.$store.state.b.editableTabsValue,
		 //tab标签所有数据
		 editableTabs: this.$store.state.b.editableTabs,
		 //修改密码状态
		 dialogFormVisible: false,
		 //修改密码表单数据
		 ruleForm: {
          username: '',
          password: '',
		  confirmPassword: ''
        }
	  }
  },
  methods:{
     radioChange(flag) {   //展开和关闭触发事件
	    this.$store.getters.increment(flag);
	  },
	 handleTabsEdit(targetName, action) {   //tab标签删除事件
        this.$store.getters.handleTabsRemoveEdit(targetName, action);
		//更新data数据
		this.editableTabs = this.$store.state.b.editableTabs;
		this.editableTabsValue = this.$store.state.b.editableTabsValue;
	
     },
	 TabGoPath(e){       //tab点击事件
	   this.$router.push(e.$el.attributes.path.nodeValue);
	 },
	 ChangColor(color){   //换肤事件
	       this.color = color;
		   this.$store.getters.incrementBgColor(color);
	 },
	 handleCommand(command) {  //admin文字旁边的下拉菜单事件
        /*if(command == '修改密码'){
		  this.dialogFormVisible = true;
		}*/
		if(command == '退出登录'){
		  this.$store.getters.incrementLoginRemoveTokenToLocalStoreage();
		}
     },
	 submitForm(){    //修改密码之表单提交事件
	    console.log(this.ruleForm)
	 }
  }
}
</script>