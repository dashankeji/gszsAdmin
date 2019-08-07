<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
	<el-row>
	  <el-button>默认按钮</el-button>
	  <el-button type="primary">主要按钮</el-button>
	  <el-button type="success">成功按钮</el-button>
	  <el-button type="info">信息按钮</el-button>
	  <el-button type="warning">警告按钮</el-button>
	  <el-button type="danger" @click="goBack">返回</el-button>
	</el-row>
  </div>
</template>

<script>

export default {
  name: 'xiaoben',
  props: {
    msg: String
  },
  methods: {
    goBack () {
	  
	  /*this.$axios.get('/user?ID=12345')
	  .then(function (response) {
		console.log(response);
	  })
	  .catch(function (error) {
		console.log(error);
	  });

      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')*/
    }
  },
  beforeCreate() {
     alert(54696);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
