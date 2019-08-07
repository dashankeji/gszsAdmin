<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
	<el-row>
	  <el-button>默认按钮</el-button>
	  <el-button type="primary">主要按钮</el-button>
	  <el-button type="success">成功按钮</el-button>
	  <el-button type="info">信息按钮</el-button>
	  <el-button type="warning">警告按钮</el-button>
	  <el-button type="danger">危险按钮</el-button>
	</el-row>
	<el-select v-model="value" placeholder="请选择">
	   <el-option-group
		  v-for="group in options"
		  :key="group.label"
		  :label="group.label">
		  <el-option
			v-for="item in group.options"
			:key="item.value"
			:label="item.label"
			:value="item.value">
		  </el-option>
       </el-option-group>
    </el-select>
	<div>
	    <p v-for="item in valueTwo">{{item.name}}</p>
	</div>
	<el-select v-model="valueThree" placeholder="请选择">
		<el-option
		  v-for="item in cities"
		  :key="item.value"
		  :label="item.label"
		  :value="item.value">
		  <span style="float: left">{{ item.label }}</span>
		  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
		</el-option>
  </el-select>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
      return {
        options: [{
          label: '热门城市',
          options: [{
            value: 'Shanghai',
            label: '上海'
          }, {
            value: 'Beijing',
            label: '北京'
          }]
        }, {
          label: '城市名',
          options: [{
            value: 'Chengdu',
            label: '成都'
          }, {
            value: 'Shenzhen',
            label: '深圳'
          }, {
            value: 'Guangzhou',
            label: '广州'
          }, {
            value: 'Dalian',
            label: '大连'
          }]
        }],
        value: '',
		valueTwo: [{name: 'xiaoben'},{name: 'xiaoming'}],
		cities: [{
          value: 'Beijing',
          label: '北京'
        }, {
          value: 'Shanghai',
          label: '上海'
        }, {
          value: 'Nanjing',
          label: '南京'
        }, {
          value: 'Chengdu',
          label: '成都'
        }, {
          value: 'Shenzhen',
          label: '深圳'
        }, {
          value: 'Guangzhou',
          label: '广州'
        }],
		valueThree: ''
      }
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
