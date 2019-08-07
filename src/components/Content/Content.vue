<template>
  <div class="content">
       <h1>{{this.$store.state.count}}</h1>
	   <img src="../../assets/logo.png">
			<div>
			  <p>
				If Element is successfully added to this project, you'll see an
				<code v-text="'<el-button>'"></code>
				below
			  </p>
			  <el-button>el-button</el-button>
			</div>
			<router-link to="/foo">Go to Foo</router-link>
			<router-link to="/bar">Go to bar</router-link>
			<router-link to="/car">Go to car</router-link>
			<HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './HelloWorld.vue'

export default {
  name: 'Content',
  components: {
    HelloWorld
  },
  beforeCreate() {
     alert(2);
  },

}
</script>
