<template>
  <div id="app">
    <des-editor @change="onInput"></des-editor>
  </div>
</template>

<script>
import Editor from '../Editor/App'; 

export default {
  components: {
    desEditor: Editor
  }, 
  created(){

  },
  methods: {
    onInput(text){
      
    }
  }
}
</script>

<style>
body {
  margin:0;
  /* background-color: rgb(145, 170, 188);  */
  /* background: #F3F3F3; */
}

ul {
  margin:0;
  padding: 0;
}
</style>
