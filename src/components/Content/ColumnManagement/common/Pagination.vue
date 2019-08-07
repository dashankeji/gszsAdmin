<template>
   <!-- 表格分页 -->
   <div class="block" ref="dataList">
	  <el-pagination
		  @size-change="handleSizeChange"
		  @current-change="handleCurrentChange"
		  :current-page="currentPage4"
		  :page-sizes="[10, 20, 40, 60, 80, 100]"
		  :page-size="10"
		  layout="total, sizes, prev, pager, next, jumper"
		  :total="total">
	  </el-pagination>
   </div>
</template>

<script>

export default {
  name: 'HomePageCommonPagination',
  props:['input'],
  data() {
     return {
	 	//分页数据
		currentPage4: 1,   //初始页码
		total: 0,          //总共多少条数据
		pageNum: 1,        //页码
		dataTotalNum: 10,  //一页显示多少条数据
		pageFlag: true,    //防止提交两次
	 }
  },
  methods: {
     handleSizeChange(val) {   //点击每页多少条数据触发事件
	   console.log(this.input = 22);
	    /*var that = this;
			that.dataTotalNum = val;
			if(!that.pageFlag) return;
			that.pageFlag = false;
			setTimeout(function(){
				that.handlePageAxiosRequest();
			},0);*/
     },
	 handleCurrentChange(val) {    //点击页码触发事件
	   
		//这里当上面点击每页多少条数据触发事件后，如果页码小于之前的就会触发，所以一次会有两个事件触发(上面和这里)
		var that = this;
		that.pageNum = val;
		if(!that.pageFlag) return;
		that.pageFlag = false;
		setTimeout(function(){
			that.handlePageAxiosRequest();
		},0);
	  },
	 handlePageAxiosRequest(){     //分页请求数据
		  
		var that = this; 		  
		var loading = this.$loading({
		  lock: true,
		  text: 'Loading',
		  spinner: 'el-icon-loading',
		  background: 'rgba(0, 0, 0, 0.7)'
		});
		
		that.$axios('/','GET',{page: that.pageNum,row: that.dataTotalNum}).then(function(res){
			that.tableData = res.data.items;
			that.total = res.data.total;
			that.pageFlag = true;
			loading.close();
		}).catch(function(err){
			that.pageFlag = true;
			loading.close();
			console.log(err);
		});
	 },
  }
}
</script>