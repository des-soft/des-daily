<template>
      <table class="des-calendar" :style="{
        fontSize:size == 'large' ? '20px' : '10px'
      }">
          <thead>
              <tr>
                  <th>一</th>
                  <th>二</th>
                  <th>三</th>
                  <th>四</th>
                  <th>五</th>
                  <th>六</th>
                  <th>日</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="(row,idx) in tableData(year,month,dayMap)" :key="idx">
                  <td v-for="(col,idx) in row" :key="idx">
                      <div v-if="col">
                          {{col.num}}
                          <div class="des-calendar-count-wrapper">
                              <div class="des-calendar-count" v-for="n in col.noteCount" :key="n"></div>
                          </div>
                      </div>
                  </td>
              </tr>
          </tbody>
    </table>
</template>

<script>
import moment from "moment";
export default {
  props:{
    year:Number,
    month:Number,
    dayMap:{
      type:Object,
      default:()=>({})
    },
    size:{
      type:String,
      default:'small'
    }
  },
  data() {
    return {

    };
  },
  methods: {
    tableData(y, m, dayNoteMap) {
      let data = [];
      data[0] = new Array(moment(`${y}-${m}`, "YYYY-MM").isoWeekday() - 1).fill(
        null
      );
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
.des-calendar {
  width: 100%;
  font-size: 10px;
}
.des-calendar td,
.des-calendar th {
  text-align: center;
  height: 1.6em;
}
.des-calendar td:hover {
  color: whitesmoke;
}
.des-calendar-count-wrapper {
  height: 0.2em;
  margin: 0.2em 0 0 45%;
  font-size: 0;
  text-align: left;
}
.des-calendar-count {
  display: inline-block;
  background: lightgray;
  width: 0.2em;
  height: 0.2em;
  margin-right: 0.1em;
}
.des-calendar th {
  font-size: 0.8em;
}
</style>
