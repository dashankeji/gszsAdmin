// vue.config.js
module.exports = {
    runtimeCompiler: true,     //(vue-router需要用)是否使用包含运行时编译器的 Vue 构建版本。设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右。
	publicPath: process.env.NODE_ENV === 'production'    
    ? './'     //打包为production，设置打包后html引入(css,js)文件的前缀
    : '/',    //本地运行vue项目服务器时会为这个,设置vue服务器路由的前缀
	devServer: {
        disableHostCheck: true,   //解决Invalid host header
    }
}