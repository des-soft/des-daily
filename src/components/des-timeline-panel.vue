<template>
<div class="des-timeline-panel">
    <div class="des-timeline-list">
        <des-list-item v-for="(daily,idx) in data" :key="idx"
        @click="chooseDaily(daily)"
        :title="daily.meta.title"
        :time="daily.meta.time"
        :author="daily.meta.author"
        :tags="daily.meta.tags.map(e=>({name:e}))"
        :firstOfDay="idx == 0 || !daily.meta.time.isSame(data[idx-1].meta.time,'day')"></des-list-item>
    </div>
    <div class="des-timeline-pagination">
        <div class="des-timeline-pagination-controls">
            <des-button @click="prev" :disabled="pagination.page == 1">
              <font-awesome-icon :icon="['fa', 'angle-left']"  />
            </des-button>
            <des-button @click="next" :disabled="pagination.page == totalPage">
              <font-awesome-icon :icon="['fa', 'angle-right']"  />
            </des-button>
            <input type="text" class="des-timeline-pagination-jump" @change="jump(arguments[0].target.value)" placeholder="go">
        </div>
        <ul class="des-timeline-pagination-pages">
            <des-button v-for="n in Math.min(8,totalPage)" @click="pageChange(n+pageOffset)" :key="n+new Date()">
                <li :class="['pagination-item',{active:n+pageOffset==pagination.page}]">{{n+pageOffset}}</li>
            </des-button>
        </ul>
    </div>
</div>
</template>

<script>
import DesListItem from "./des-list-item";
import DesButton from "./des-button";
import Q from "../daily-core/Query";
import moment from "moment";

export default {
  components: {
    DesListItem,
    DesButton
  },
  data() {
    return {
      moment,
      pagination: {
        page: 1,
        total: 200,
        pageSize: 15
      },
      data: []
    };
  },
  created() {
    Q.run('pagination/1').then(list => {
      this.data = list.map(obj=>{
        obj.meta.time = moment(obj.meta.time);
        return obj;
      });
    });

    Q.run('total').then(total => (this.pagination.total = total));


    // DPool/add 会在新建文件的时候触发 
    this.$bridge.bus.removeAllListeners('DPool/add'); 
    this.$bridge.bus.on('DPool/add', (_, new_daily) => {
      new_daily.meta.time = moment(new_daily.meta.time);

      this.data.push(new_daily); 
    }); 

  },
  computed: {
    totalPage() {
      return (
        parseInt((this.pagination.total - 1) / this.pagination.pageSize) + 1
      );
    },
    pageOffset() {
      let { page } = this.pagination;
      if (page < 4 || this.totalPage <= 8) return 0;
      if (page > this.totalPage - 4) {
        return this.totalPage - 4 - 4;
      }
      return page - 4;
    }
  },
  methods: {
    pageChange(n) {
      this.pagination.page = n;
    },
    jump(n) {
      this.pagination.page = Math.max(Math.min(this.totalPage, n), 1);
    },
    prev() {
      if (this.pagination.page > 1) {
        this.pagination.page--;
      }
    },
    next() {
      if (this.pagination.page < this.totalPage) {
        this.pagination.page++;
      }
    },
    chooseDaily(daily){
      this.$d_bus.$emit('init-edit', daily); 
    }
  }
};
</script>

<style>
.des-timeline-panel {
  height: calc(100% - 35px - 20px);
  margin-top: 20px;
}
.des-timeline-list {
  overflow-y: scroll;
  padding-right: 20px;
  height: calc(100% - 50px);
  box-sizing: border-box;
}
.des-timeline-list::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0);
}
.des-timeline-list:hover::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.1);
}
::-webkit-scrollbar {
  width: 10px;
}
.des-timeline-pagination {
  height: 50px;
  margin-top: 15px;
  list-style: none;
  font-size: 20px;
}
.des-timeline-pagination .pagination-item {
  display: inline-block;
  font-size: 20px;
  text-align: center;
  width: 35px;
}
.des-timeline-pagination .pagination-item.active {
  font-size: 1.2em;
  color: whitesmoke;
}
.des-timeline-pagination-pages {
  margin-right: calc(100% - 8 * 35px);
}
.des-timeline-pagination-controls {
  float: right;
  font-size: 25px;
  line-height: 30px;
}
.des-timeline-pagination-jump {
  width: 30px;
  border-radius: 2px;
  background: rgb(151, 139, 158);
  border: none;
  outline: none;
  height: 20px;
  color: rgb(92, 81, 99);
  font-size: 16px;
  font-family: inherit;
  padding: 5px;
  margin: 0 15px 0 10px;
  vertical-align: top;
}
</style>
