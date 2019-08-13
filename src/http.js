/**
 * 
 * http配置
 */

import axios from 'axios'
import store from './store/config.js'

// axios 配置
axios.defaults.timeout = 5000
axios.defaults.baseURL = 'https://www.largehill.com/dashan/public/index.php'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'


//http request 拦截器
axios.interceptors.request.use(
     config => {
		 
		if(config.url == '/api/user/login') return config;
			
		if(config.method == 'get') {
			
			config.params.token = store.state.login.token;
		}else{
			config.params = {};
			config.params.token = store.state.login.token;
		};
		
		
		return config;
		
    },
    err => {
      return Promise.reject(err);
    }
  );

//http response 拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做处理
    
	if(response.data.code == 400 && response.data.msg == 'token已经失效了' || response.data.msg == '没有token'){
		alert(response.data.msg);
		store.getters.incrementLoginFlagFalse();
	};
	
    return response;
  }, function (error) {
    // 对响应错误做处理
	console.log('错误了: ' + error);
    return Promise.reject(error);
});

export default function(url, method, params = {}) {
    // 首先判断是get请求还是post请求
    let data = method.toLocaleLowerCase() === 'get' ? 'params' : 'data';
    return axios({
        method,
        url,
        [data]: params // 差异点在于data的值
    }).then((res) => {
        return Promise.resolve(res.data);
    }).catch((err) => {
        return Promise.reject(err);
    })
}
