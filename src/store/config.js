/**
 * 
 * vuex配置
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const loginState = {     //后台登录状态
	 state:{
		flag: false,
		imgUploadUrl: 'https://www.largehill.com/dashan/public',    //图片访问前缀
		imgUploadUrlTwo: 'https://www.largehill.com/dashan/public/index.php',   //图片上传前缀
		token: ''     //请求时携带token
	},
	getters: {
		incrementLoginFlag: (state) => () => {
			state.flag = true;
		},
		incrementLoginFlagFalse: (state) => () => {
			state.flag = false;
		},
		incrementLoginSaveTokenToLocalStoreage: (state) => (token) => {
			// Check browser support
			if (typeof(Storage) !== "undefined") {
				// Store
				localStorage.setItem("dashanAdminToken", token);	
			} else {
				alert("抱歉！您的浏览器不支持 Web Storage ...");
			};
		},
		incrementLoginGetTokenToLocalStoreage: (state) => () => {
			// Check browser support
			if (typeof(Storage) !== "undefined") {
				// Store
				var token = localStorage.getItem("dashanAdminToken");
				if(token){
					loginState.state.flag = true;
					loginState.state.token = token;
				}
			} else {
				alert("抱歉！您的浏览器不支持 Web Storage ...");
			};
		},
		incrementLoginRemoveTokenToLocalStoreage: () => () => {
			if (typeof(Storage) !== "undefined") {
				// Store
			    localStorage.removeItem('dashanAdminToken');
			    loginState.state.flag = false;
			    loginState.state.token = '';
			} else {
				alert("抱歉！您的浏览器不支持 Web Storage ...");
			};	
		}
	}
}

const moduleA = {     //展开和关闭NavMenu菜单状态 和 (换肤)颜色改变
    state:{
		isCollapse: false,
		left: 210,
		bgColor: 'rgb(48, 65, 86)'
	},
	getters: {
		increment: (state) => (flag) => {
		  // 变更状态
		   if(flag){
			   state.left = 85;
		   }else{
			   state.left = 210;
		   };
		   state.isCollapse = flag;
		   
		},
		incrementBgColor: (state) => (bgColor) => {
			 state.bgColor = bgColor;
		}
		
	}
};

const moduleB = {     //Tab标签状态
    state:{
		editableTabsValue: {name: ''},
		editableTabs: [],
		tabIndex: 0
	},
	getters: {
        handleTabsRemoveEdit: (state) => (targetName, action)=> {         //删除
		
			if (action === 'remove') {
			  let tabs = state.editableTabs;
			  let activeName = state.editableTabsValue.name;
			  if (activeName === targetName) {
				tabs.forEach((tab, index) => {
				  if (tab.name === targetName) {
					let nextTab = tabs[index + 1] || tabs[index - 1];
					if (nextTab) {
					  activeName = nextTab.name;
					}
				  }
				});
			  };

			  state.editableTabsValue.name = activeName;
			  state.editableTabs = tabs.filter(tab => tab.name !== targetName);
			};
		},
		handleTabsAddEdit: (state) => (tab)=> {                //增加
		  var fifterEditableTabs = state.editableTabs.filter(tabs => tabs.title == tab.title && tabs.path == tab.path);
		  if(fifterEditableTabs.length > 0) { state.editableTabsValue.name = fifterEditableTabs[0].name; return;};
		  
		  let newTabName = ++state.tabIndex + '';
		  tab.name = newTabName;
          state.editableTabs.push(tab);
          state.editableTabsValue.name = newTabName;
		}
	}
};


const store = new Vuex.Store({
  modules: {
	login: loginState,
    a: moduleA,
	b: moduleB
  }
})


export default store