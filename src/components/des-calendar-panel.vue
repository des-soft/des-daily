<template>
    <div class="des-calendar-panel">
        <div class="info">
          <span class="info-year">
            <input type="text" :value="curYear" v-show="yearInputing" class="info-input" ref="yearInput" @keydown.enter="changeCur('year',arguments[0].target.value)" @blur="changeCur('year',arguments[0].target.value)">
            <span @dblclick="dblclick('year')" v-show="!yearInputing">{{curYear}}</span>
          </span> 年 
          <span v-show="curMonth">
            <span class="info-month" v-show="curMonth">
              <input type="text" :value="curMonth" v-show="monthInputing" class="info-input" ref="monthInput" @keydown.enter="changeCur('month',arguments[0].target.value)" @blur="changeCur('month',arguments[0].target.value)">
              <span @dblclick="dblclick('month')" v-show="!monthInputing">{{curMonth}}</span>
            </span> 月
          </span>
          <div class="control-bar">
            <des-button style="margin-right:10px" @click="overview" :disabled="!curMonth">
              <font-awesome-icon :icon="['fa', 'th']"  />
            </des-button>
            <des-button @click="prev" :disabled="curMonth && curMonth<=1 || !curMonth && curYear<=2018">
              <font-awesome-icon :icon="['fa', 'angle-left']"  />
            </des-button>
            <des-button @click="next" :disabled="curMonth && curMonth>=12">
              <font-awesome-icon :icon="['fa', 'angle-right']"  />
            </des-button>
          </div>
        </div>
        <des-calendar @choose="chooseDay" :year="curYear" :countMap="countMap[curYear] ? countMap[curYear][curMonth] || {} : {}" :month="curMonth" size="large" v-if="curMonth"></des-calendar>
        <des-calendar-overview :year="curYear" :countMap="countMap[curYear] || {}" v-else @click="chooseMonth(arguments[0])"></des-calendar-overview>
        <div class="list">
          <des-list-item v-for="(daily,idx) in list" :key="idx"
        :title="daily.meta.title"
        :time="daily.meta.date"
        :author="daily.meta.author"
        :tags="daily.meta.tag.split(',').map(e=>({name:e.trim()}))"></des-list-item>
        </div>
    </div>
</template>

<script>
import moment from "moment";
import DesCalendarOverview from "./des-calendar-overview";
import DesCalendar from "./des-calendar";
import DesButton from "./des-button";
import DesListItem from "./des-list-item";
import Q from "../daily-core/Query";
import Vue from "vue";
Q.define("countMap", list => {
  let map = {};
  list.forEach(({ meta: { date } }) => {
    let d = moment(date);
    let year = d.format("YYYY");
    let month = d.format("M");
    let day = d.format("D");
    if (!map[year]) map[year] = {};
    if (!map[year][month]) map[year][month] = {};
    if (!map[year][month][day]) {
      map[year][month][day] = 1;
    } else {
      map[year][month][day]++;
    }
  });
  return map;
});
export default {
  components: {
    DesCalendarOverview,
    DesButton,
    DesCalendar,
    DesListItem
  },
  data() {
    return {
      curYear: 2018,
      curMonth: 2,
      yearInputing: false,
      monthInputing: false,
      list: [],
      countMap: {}
    };
  },
  created() {
    Q.countMap().then(countMap => {
      console.log(countMap)
      this.countMap = countMap;
    });
  },
  methods: {
    overview() {
      this.curMonth = null;
    },
    chooseDay(day) {
      Q.date(`${this.curYear}-${this.curMonth}-${day}`).then(list => {
        this.list = list;
      });
    },
    dblclick(type) {
      if (type == "year") {
        this.yearInputing = true;
        Vue.nextTick(() => {
          this.$refs.yearInput.focus();
        });
      } else {
        this.monthInputing = true;
        Vue.nextTick(() => {
          this.$refs.monthInput.focus();
        });
      }
    },
    changeCur(type, value) {
      if (type == "year") {
        value = Math.min(2099, value);
        value = Math.max(2018, value);
        this.curYear = value;
        this.yearInputing = false;
      } else {
        value = Math.min(12, value);
        value = Math.max(1, value);
        this.curMonth = value;
        this.monthInputing = false;
      }
    },
    chooseMonth(month) {
      this.curMonth = month;
    },
    prev() {
      if (this.curMonth && this.curMonth > 1) {
        this.curMonth--;
      } else if (!this.curMonth && this.curYear > 2018) {
        this.curYear--;
      }
    },
    next() {
      if (this.curMonth && this.curMonth < 12) {
        this.curMonth++;
      } else if (!this.curMonth) {
        this.curYear++;
      }
    }
  }
};
</script>

<style>
.des-calendar-panel {
  padding-top: 20px;
  padding-right: 20px;
}
.info {
  font-size: 20px;
  padding-bottom: 10px;
}
.control-bar {
  font-size: 20px;
  float: right;
}
.info-month .info-input {
  width: 25px;
}
.info-input {
  background: transparent;
  border: none;
  outline: none;
  font: inherit;
  color: whitesmoke;
  width: 50px;
}
.des-calendar-panel .list {
  position: absolute;
  top: 450px;
  bottom: 0;
  left: 0px;
  padding-left: 20px;
  width: calc(100% - 20px);
  border-top: solid 2px rgb(161, 149, 168);
  overflow: auto;
}
</style>
