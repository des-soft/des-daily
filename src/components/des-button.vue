<template>
    <span v-on="$listeners" :class="{'des-button':!disabled,'des-button__disabled':disabled}">
        <slot></slot>
    </span>
</template>

<script>
export default {
  props:{
    disabled:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
    };
  },
};
</script>

<style>
.des-button{
  cursor: pointer;
}
.des-button:hover{
  color:whitesmoke;
}
.des-button__disabled{
  opacity: 0.2;
}
</style>
