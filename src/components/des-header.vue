<template>
    <div class="des-header color-main-bg">
        Des Daily
        <font-awesome-icon class="to-right" :icon="['fa', 'times']" />
    </div>
</template>

<script>
// import faTimes from '@fortawesome/fontawesome-free-solid/faTimes'



export default {
  computed: {
      icon(){
          return ''
      }
  }
}
</script>


<style scpoed>
.des-header {
    padding: 0 1em; 
    box-sizing: border-box; 
    width: 100%; 
    height: 100%; 
    line-height: 36px; 
    font-family: Consolas, Menlo; 
    color: rgb(161, 149, 168); 
    user-select: none;
}

.to-right {
    position: absolute;
    line-height: 36px; 
    height: 36px; 
    right: 0;
    padding: 0 1em; 
    cursor: pointer;
}
</style>

