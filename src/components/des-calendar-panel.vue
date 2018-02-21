<template>
    <div class="des-calendar-panel">
        <table class="des-calendar-panel-table">
            <thead class="des-calendar-panel-table-thead">
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
                <tr v-for="(row,idx) in tableData(2018,2,{ 1:2, 3:1 })" :key="idx" class="des-calendar-panel-table-tr">
                    <td v-for="(col,idx) in row" :key="idx" class="des-calendar-panel-table-td">
                        <div v-if="col">
                            {{col.num}}
                            <div class="des-calendar-panel-table-count-wrapper">
                                <div class="des-calendar-panel-table-count" v-for="n in col.noteCount" :key="n"></div>
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      data: [
        {
          year: 2018,
          months: [
            {
              month: 1,
              dayNoteMap: {
                1: 2,
                3: 1
              }
            }
          ]
        }
      ]
    };
  },
  methods: {
    rowCountInMonth(y, m) {
      return (
        (daysInMonth(y, m) + moment(`${y}-${m}`, "YYYY-MM").day() - 1) / 7 + 1
      );
    },
    daysInMonth(y, m) {
      return moment(`${y}-${m}`, "YYYY-MM").daysInMonth();
    },
    tableData(y, m, dayNoteMap) {
      let data = [];
      data[0] = new Array(moment(`${y}-${m}`, "YYYY-MM").day() - 1 || 1).fill(
        null
      );
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
      for (let i = 1; i <= this.daysInMonth(y, m); i++) {
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
.des-calendar-panel-table {
  width: 100%;
  margin: 20px 10px;
}
.des-calendar-panel-table-td {
  text-align: center;
  font-size: 25px;
}
.des-calendar-panel-table-td:hover{
    color:whitesmoke;
}
.des-calendar-panel-table-count-wrapper {
  height: 5px;
  line-height: 5px;
  max-width: 90%;
  margin-left: 20%;
  margin-bottom: 10px;
  font-size: 0;
}
.des-calendar-panel-table-count {
  display: inline-block;
  background: lightgray;
  width: 5px;
  height: 5px;
  margin-right: 5px;
}
.des-calendar-panel-table-thead{
    font-size: 18px;
}
</style>
