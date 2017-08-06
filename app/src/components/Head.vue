
<template>
  <div id="head" class="bs-example" data-example-id="simple-nav-justified">
    <ul class="nav nav-tabs nav-justified">
      <li role="presentation" v-for='(item,index) in navList' @click='tartionTab(index)' :class="{'active':index==Index}">
          <router-link :to="{ path:item.link}">{{item.name}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
    props:{
      navList:{
        type:Array,
      }
    },
    data () {
      return {
        Index:0,
      }
    },
    methods:{
       tartionTab(index){
         this.Index=index;
       }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#head{
  margin-bottom: 40px;
}
h1, h2 {
  font-weight: normal;
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
