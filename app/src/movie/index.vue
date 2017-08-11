<style>
	*{
		padding: 0;
		margin: 0;
		list-style: none;
		text-decoration: none;
	}
</style>
<template>
  <div id="app">
  	<heads :nav-list='navList'/>
    <router-view></router-view>
  </div>
</template>
<script>

import Heads from '../components/Head.vue'
	export default{
		components: {
			Heads
		},
		data () {
			return {
				navList: [
				   {
				   	  name:'首页',
				   	  link:'/'	
				   },
				   {
				   	  name:'录入页',
				   	  link:'admin'
				   },
				   {
				   	  name:'列表页',
				   	  link:'list'
				   }
				]
			}
		}
	}
</script>