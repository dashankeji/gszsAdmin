/**
 * 
 * 路由配置
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from '../http'
import store from '../store/config.js'

Vue.use(VueRouter);

import Xiaoben from '../components/Content/xiaoben.vue'
import Content from '../components/Content/Content.vue'
import Editor from '../components/Content/Editor.vue'
//const EditorTwo = ()=> import('../components/Content/EditorTwo.vue')   // 这个快1M
import Table from '../components/Content/Table.vue'
import TableTwo from '../components/Content/TableTwo.vue'

/* 栏目管理 */
import HomePageBanner from '../components/Content/ColumnManagement/HomePageBanner.vue'
import HomePageNavigationBar from '../components/Content/ColumnManagement/HomePageNavigationBar.vue'
import HomePageContactWe from '../components/Content/ColumnManagement/HomePageContactWe.vue'
import HomePageAboutWe from '../components/Content/ColumnManagement/HomePageAboutWe.vue'
import HomePageCompanyProfile from '../components/Content/ColumnManagement/HomePageCompanyProfile.vue'
import HomePageNews from '../components/Content/ColumnManagement/HomePageNews.vue'
import HomePageProductServices from '../components/Content/ColumnManagement/HomePageProductServices.vue'
/* 系统管理 */
import EssentialInformation from '../components/Content/SystemManagement/EssentialInformation.vue'

const Foo = { template: '<h1 style="text-align:center">欢迎来到管理后台</h1>' }
const Bar = { template: '<div>bar</div>' }
const Car = { template: '<div>car</div>' }

const routes = [
  { path: '/', component: Foo },
  { path: '/foo', component: Table },
  { path: '/bar', component: Content },
  { path: '/car', component: Xiaoben, props: { msg: 'xiaobens' } },
  { path: '/editor', component: Editor },
  //{ path: '/editorTwo', component: EditorTwo },
  { path: '/table', component: TableTwo },
  /* 栏目管理 */
  { path: '/homePage_banner', component: HomePageBanner },
  { path: '/homePage_navigationBar', component: HomePageNavigationBar },
  { path: '/HomePage_contactWe', component: HomePageContactWe},
  { path: '/homePage_aboutWe', component: HomePageAboutWe },
  { path: '/homePage_companyProfile', component: HomePageCompanyProfile },
  { path: '/homePage_news', component: HomePageNews },
  { path: '/HomePage_productServices', component: HomePageProductServices },
  /* 系统管理 */
  { path: '/systemInformation_essentialInformation', component: EssentialInformation },
]

const router = new VueRouter({
  mode: 'hash',
  routes 
})

//所有vue路由拦截
router.beforeEach((to, from, next) => {
	
   /*if(from.path == '/' && to.path == '/car'){
	   alert('www');
	   axios.get('/user?ID=12345')
	  .then(function (response) {
		console.log(response);
		
		next();
	  })
	  .catch(function (error) {
		console.log(error);
		next();
	  });
   }else{
	   next();
   };*/
   next();
   
})

export default router