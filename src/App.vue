<template>
  <div id="app">
    <component :is="componentName" @changeCom="changeCom"></component>
  </div>
</template>

<script>
import index from './components/index.vue'
import login from './components/login.vue'

export default {
  name: 'app',
  components: {
    index,
    login
  },
  data(){
    return{
      componentName:"index"
    }
  },
  methods:{
    changeCom(name){
      this.componentName = name;
      window.console.log(name)
    }
  }
}
</script>

<style>
  #app{
    height: 100%;
    width: 100%;
  }
</style>
