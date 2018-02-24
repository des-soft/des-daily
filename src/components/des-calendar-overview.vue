<template>
    <div class="des-calendar-panel-overview">
      <div v-for="n in 12" class="des-calendar-panel-table-wrapper" :key="n" :data-month="n" @click="onClick(n)">
        <des-calendar :year="year" :month="n"></des-calendar>
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
    year:Number
  },
  data() {
    return {
    };
  },
  methods: {
    onClick(n){
      this.$emit('click',n)
    },
    tableData(y, m, dayNoteMap) {
      let data = [];
      data[0] = new Array(moment(`${y}-${m}`, "YYYY-MM").isoWeekday() - 1).fill(null);
      function daysInMonth(y, m) {
        return moment(`${y}-${m}`, "YYYY-MM").daysInMonth();
      }
      function push(item) {
        let arr = null;
        if (data[data.length - 1].length == 7) {
          arr = [];
          data.push(arr);
        } else {
          arr = data[data.length - 1];
        }
        arr.push(item);
      }
      for (let i = 1; i <= daysInMonth(y, m); i++) {
        push({
          num: i,
          noteCount: dayNoteMap[i] || 0
        });
      }

      //尾行补全成7列
      let lastArr = data[data.length - 1];
      for (let i = lastArr.length; i <= 7; i++) {
        lastArr[i] = null;
      }
      return data;
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
  padding: 0 8px;
  height: 130px;
  display: inline-block;
  width: 33.3%;
}
.des-calendar-panel-table-wrapper:hover{
  color:white;
}
.des-calendar-panel-table-wrapper:before{
  content: attr(data-month);
  position: absolute;
  top:0;
  left: 0;
  font-size: 60px;
  width: 100%;
  line-height: 120px;
  text-align: center;
  opacity: 0.5;
  z-index: -1;  
}
</style>
