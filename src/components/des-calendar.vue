<template>
      <table class="des-calendar" :style="{
        fontSize:size == 'large' ? '20px' : '8px'
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
              <tr v-for="(row,idx) in tableData(year,month,countMap)" :key="idx">
                  <td v-for="(col,idx) in row" :key="idx" @click="chooseDay(col.num)">
                      <div v-if="col">
                          {{col.num}}
                          <div :class="['des-calendar-count-wrapper',{'des-calendar-count-wrapper__large':size=='large'}]">
                              <div :class="['des-calendar-count',{'des-calendar-count__large':size=='large'}]" v-for="n in col.noteCount" :key="n"></div>
                          </div>
                      </div>
                  </td>
              </tr>
          </tbody>
    </table>
</template>

<script>
import moment from "moment";
import Q from "../daily-core/Query";
export default {
  props: {
    year: Number,
    month: Number,
    countMap: Object,
    size: {
      type: String,
      default: "small"
    }
  },
  data() {
    return {};
  },
  methods: {
    chooseDay(day) {
      this.$emit('choose',day)
    },
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
          noteCount: dayNoteMap[i] ? Math.max(0, Math.min(4, dayNoteMap[i])) : 0
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
}
.des-calendar td,
.des-calendar th {
  text-align: center;
  height: 2em;
}
.des-calendar td:hover {
  color: whitesmoke;
  cursor: pointer;
}
.des-calendar-count-wrapper {
  height: 1px;
  margin: 1px auto 0;
  font-size: 0;
  text-align: center;
}
.des-calendar-count-wrapper__large {
  height: 4px;
  margin: 2px 0 0 43%;
  text-align: left;
}
.des-calendar-count {
  display: inline-block;
  background: lightgray;
  width: 2px;
  height: 2px;
  margin-right: 1px;
}
.des-calendar-count__large {
  width: 5px;
  height: 5px;
  margin-right: 2px;
}
.des-calendar th {
  font-size: 0.8em;
}
</style>
