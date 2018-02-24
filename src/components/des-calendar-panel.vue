<template>
    <div class="des-calendar-panel">
        <div class="info">
          <span class="info-year">
            <input type="text" :value="curYear" v-show="yearInputing" class="info-input" ref="yearInput" @change="changeCur('year',arguments[0].target.value)">
            <span @dblclick="dblclick('year')" v-show="!yearInputing">{{curYear}}</span>
          </span> 年 
          <span v-show="curMonth">
            <span class="info-month" v-show="curMonth">
              <input type="text" :value="curMonth" v-show="monthInputing" class="info-input" ref="monthInput" @change="changeCur('month',arguments[0].target.value)">
              <span @dblclick="dblclick('month')" v-show="!monthInputing">{{curMonth}}</span>
            </span> 月
          </span>
          <div class="control-bar">
            <des-button @click="overview" :disabled="!curMonth">
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
        <des-calendar :year="curYear" :month="curMonth" size="large" v-if="curMonth"></des-calendar>
        <des-calendar-overview :year="curYear" v-else @click="chooseMonth(arguments[0])"></des-calendar-overview>
    </div>
</template>

<script>
import moment from "moment";
import DesCalendarOverview from "./des-calendar-overview";
import DesCalendar from "./des-calendar";
import DesButton from "./des-button";
export default {
  components: {
    DesCalendarOverview,
    DesButton,
    DesCalendar
  },
  data() {
    return {
      curYear: 2018,
      curMonth: 2,
      nowYear: 2018,
      nowMonth: 2,
      yearInputing: false,
      monthInputing: false,
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
    overview() {
      this.curMonth = null;
    },
    dblclick(type) {
      if(type == 'year'){
        this.yearInputing = true;
        this.$refs.yearInput.focus();
      }else{
        this.monthInputing = true;
        this.$refs.monthInput.focus();
      }
    },
    changeCur(type,value){
      if(type == 'year'){
        value = Math.min(2099,value);
        value = Math.max(2018,value);
        this.curYear = value;
        this.yearInputing = false;
      }else{
        value = Math.min(12,value);
        value = Math.max(1,value);
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
}
.info {
  font-size: 20px;
  padding: 0 10px 10px;
}
.control-bar {
  font-size: 20px;
  float: right;
}
.info-month .info-input{
  width: 25px
}
.info-input {
  background: transparent;
  border: none;
  outline: none;
  font: inherit;
  color: whitesmoke;
  width: 50px;
}
</style>
