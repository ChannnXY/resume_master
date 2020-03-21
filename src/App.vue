<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data(){
    return{
      componentName:"login"
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
