<template>
    <div class="des-calendar-panel-overview">
      <div v-for="n in 12" class="des-calendar-panel-table-wrapper" :key="n" :data-month="n" @click="onClick(n)">
        <des-calendar :year="year" :month="n" :countMap="countMap[n] || {}"></des-calendar>
      </div>
    </div>
</template>

<script>
import moment from "moment";
import DesCalendar from "./des-calendar";
export default {
  components:{
    DesCalendar
  },
  props:{
    year:Number,
    countMap:Object
  },
  data() {
    return {
    };
  },
  methods: {
    onClick(n){
      this.$emit('click',n)
    }
  }
};
</script>

<style>
.des-calendar-panel-overview{
  font-size: 0;
  position: absolute;
  z-index: 0;
}
.des-calendar-panel-table-wrapper{
  box-sizing: border-box;
  position: relative;
  padding-right: 8px;
  height: 105px;
  display: inline-block;
  width: 25%;
}
.des-calendar-panel-table-wrapper:hover{
  color:white;
  cursor: pointer;
}
.des-calendar-panel-table-wrapper:before{
  content: attr(data-month);
  position: absolute;
  top:0;
  left: 0;
  font-size: 60px;
  width: 100%;
  line-height: 105px;
  text-align: center;
  opacity: 0.4;
  z-index: -1;  
}
</style>
