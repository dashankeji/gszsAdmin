import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router/config.js'
import axios from './http'
import store from './store/config.js'

//  富士本
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

/***
  **  富士本
  */
import Quill from 'quill'
var Size = Quill.import('attributors/style/size');
Size.whitelist = ['10px', '12px', '14px', '16px', '18px', '20px'];
Quill.register(Size, true);

Vue.use(VueQuillEditor)

Vue.config.productionTip = false

/***  
  **  element-ui
  */
Vue.use(ElementUI);
  // Vue.use(ELEMENT);               //在外部引入的element-ui的为ELEMENT，如此写即可
/*
<!-- 引入elment-ui样式 -->
<link rel="stylesheet" href="https://unpkg.com/element-ui@2.4.5/lib/theme-chalk/index.css">
<!-- 引入elment-ui组件库 -->
<script src="https://unpkg.com/element-ui@2.4.5/lib/index.js"></script>
*/  


/***
  **  axios
  */
Vue.prototype.$axios = axios

//渲染
new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
