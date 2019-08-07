<template>
  <div id="app">
    <template v-if="this.$store.state.login.flag">
    <LeftNavMent></LeftNavMent>
	<div class="wrap" :style="'margin-top:10px;margin-right:10px;margin-bottom:10px;'+'margin-left: ' + this.$store.state.a.left + 'px'">
	     <RightHead></RightHead>
		 <div class="content" style="margin-left:20px;margin-top:20px;;padding:20px;border:1px solid #dcdfe6;box-shadow:0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);-webkit-box-shadow:0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);overflow:hidden">
		    <router-view v-if="isRouterAlive"></router-view>
	     </div>
		 <Footer></Footer>
	</div>
	</template>
	<template v-else>
	    <Login></Login>
	</template>
  </div>
</template>

<script>
//登录页面
import Login from './components/Login/index.vue'
//登录进去页面
import LeftNavMent from './components/LeftNavMent.vue'
import RightHead from './components/RightHead.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'app',
  components: {
    //登录页面
    Login: Login,
    //登录进去页面
    LeftNavMent: LeftNavMent,
	RightHead: RightHead,
	Footer: Footer
  },
  provide() {   //可以给子组件调用
     return { 
	    reload: this.reload
	 }
  },
  data() {
     return {
	    isRouterAlive: true
	 }
  },
  methods: {
     reload() {           //用true和false控制route路由重载
	    var that = this;
			that.isRouterAlive = false;
			setTimeout(function(){
			   that.isRouterAlive = true;
			},1000);
	 }
  },
  created: function () {
     this.$store.getters.incrementLoginGetTokenToLocalStoreage();
  } 
}
</script>

<style>
*{
   margin: 0;
   padding: 0;
}
html,body{
    height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 10px;
  height: 100%;
}
</style>
