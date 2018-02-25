<template>
    <div class="des-timeline-panel">
        <des-list-item title="长夜漫漫" v-for="n in 10"
        :key="n"
        time="2018-01-01 12:11:11"
        author='eczn'
        :firstOfDay="n==1"></des-list-item>
    </div>
</template>

<script>
import DesListItem from "./des-list-item";
export default {
  components: {
    DesListItem
  },
  data() {
    return {};
  }
};
</script>

<style>
.des-timeline-panel{
    overflow-y:scroll;
    margin-top:20px;
    height: calc(100% - 35px - 20px);
    padding-right: 20px;
    box-sizing: border-box;
}
.des-timeline-panel::-webkit-scrollbar-thumb{
    background-color:rgba(0,0,0,0);
}
.des-timeline-panel:hover::-webkit-scrollbar-thumb{
    background-color:rgba(0,0,0,0.1);
}
::-webkit-scrollbar {
    width:10px;
}
</style>
