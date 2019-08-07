<template>
<div class="header">
    <div style="width: 100%;height: 50px;line-height: 50px;background: #2b2f3a;text-align: center;overflow: hidden;color:#fff">
       <template v-if="this.$store.state.a.isCollapse">    
	       <h3>大山</h3>
	   </template>
	   <template v-else>
	       <h3>大山科技</h3>
	   </template>
	</div>
	<el-menu default-active="1-1" :background-color="this.$store.state.a.bgColor" text-color="#a7b1c2" active-text-color="#fff" class="el-menu-vertical-demo" router :collapse="this.$store.state.a.isCollapse">
		  <template v-for="item in menus">
			  <template v-if="item.type === 'submenu'">
					<el-submenu :index="item.index">
						 <template slot="title">
							<i :class="item.icon"></i>
							<span slot="title">{{item.title}}</span>
						</template>
						 <template v-for="itemTwo in item.child">
							   <template v-if="itemTwo.type === 'menu'">
									<el-menu-item :index="itemTwo.index" @click.native="navMenuClick(itemTwo.index,itemTwo.title)">
										<span slot="title">{{itemTwo.title}}</span>
									</el-menu-item>
							   </template>
						 </template>
					</el-submenu>
			  </template>
		  </template>
    </el-menu>
	   
</div>
</template>

<style>
  .header{
    height: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
	text-align: center;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
  }
  .el-menu-vertical-demo{
    height: 100%;
  }
  .el-menu-item{
    text-align: right;
  }
</style>

<script>
  export default {
    data() {
      return {
		menus: [
		/*{
          type: 'submenu',
          title: '导航一',
          index: '1',
          icon: 'el-icon-location',
          child:[{ type: 'menu',title: '导航一选项1',index: '1-1' },{ type: 'menu',title: '导航一选项2', index: 'bar' }]
        },
        {
          type: 'submenu',
          title: '导航二',
          index: '2',
          icon: 'el-icon-s-help',
          child:[{ type: 'menu',title: '导航二选项1',index: '2-1' },{ type: 'menu',title: '导航二选项2', index: 'foo' }]
        },
		{
          type: 'submenu',
          title: '导航三',
          index: '3',
          icon: 'el-icon-s-opportunity',
          child:[{ type: 'menu',title: '导航三富士本1',index: '/editorTwo' },{ type: 'menu',title: '导航三富士本2', index: 'editor' }]
        },
        {
          type: 'submenu',
          title: '导航四',
          index: '4',
          icon: 'el-icon-position',
          child:[{ type: 'menu',title: '导航四选项1',index: '4-1' },{ type: 'menu',title: '导航四选项2', index: 'table' }]
        },
        {
          type: 'submenu',
          title: '导航五',
          index: '8',
          icon: 'el-icon-ship',
          child:[{ type: 'menu',title: '导航五选项1',index: '6-1' },{ type: 'menu',title: '导航五选项2', index: 'car' }]
        },*/
	    {
          type: 'submenu',
          title: '栏目管理',
          index: '9',
          icon: 'el-icon-ship',
          child:[{ type: 'menu',title: '首页轮播图',index: 'homePage_banner' },{ type: 'menu',title: '首页导航栏',index: 'homePage_navigationBar' },{ type: 'menu',title: '联系我们',index: 'HomePage_contactWe' },{ type: 'menu',title: '关于我们',index: 'homePage_aboutWe' },{ type: 'menu',title: '公司简介',index: 'homePage_companyProfile' },{ type: 'menu',title: '最新动态',index: 'homePage_news' },{ type: 'menu',title: '产品服务',index: 'HomePage_productServices' }]
        },
	    {
          type: 'submenu',
          title: '系统管理',
          index: '10',
          icon: 'el-icon-ship',
          child:[{ type: 'menu',title: '基本信息',index: 'systemInformation_essentialInformation' }]
        }
        ]
      };
    },
    methods: {
	  navMenuClick(path,title){       //导航菜单点击事件
         this.$store.getters.handleTabsAddEdit({ title: title,path: path });
      }
    }
  }
</script>