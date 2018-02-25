<template>
    <div class="des-aside color-main-bg">
        <des-nav @change="navChange"></des-nav>
        <component :is="`des-${nav}-panel`"></component>
    </div>
</template>

<script>
import DesNav from "./des-nav";
import DesTimelinePanel from "./des-timeline-panel";
import DesCalendarPanel from "./des-calendar-panel";
import Q from "../daily-core/Query";
Q.define("total", list => list.length);
export default {
  components: {
    DesNav,
    DesTimelinePanel,
    DesCalendarPanel
  },
  data() {
    return {
      nav: "timeline"
    };
  },
  created() {
  },
  methods: {
    navChange(value) {
      this.nav = value;
    }
  }
};
</script>

<style>
.des-aside {
  font-size: 14px;
  padding: 1em 0 1em 1.5em;
  box-sizing: border-box;

  /* background-color: rgb(68, 58, 85);  */
  color: rgb(151, 139, 158);
  user-select: none;
  width: 100%;
  height: 100%;
}
</style>
