<template>
    <div class="des-list-item">
        <div class="right" v-if="firstOfDay">
            {{week}}
            <p>{{day}}</p>
        </div>
        <div class="left" @click="click">
            <h4 class="des-list-item-title">{{title}}</h4>
            <div class="des-list-item-info">
                <span class="des-list-item-time">{{time}}</span>
                <span class="des-list-item-tags">
                    <span class="des-list-item-tag" v-for="tag in tags" :key="tag.id">#{{tag.name}}</span>
                </span>
                <span class="des-list-item-author">by {{author}}</span>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
moment.locale('zh-cn')
export default {
    props:{
        title:String,
        time:String,
        author:String,
        tags:Array,
        firstOfDay:Boolean
    },
    data(){
        return {
        }
    },
    computed:{
        week(){
            return moment(this.time).format('ddd')
        },
        day(){
            return moment(this.time).format('DD')
        }
    },
    methods:{
        click(){
            this.$emit('click')
        }
    }
}
</script>

<style>
.des-list-item {
}
.des-list-item .left{
    margin-right: 50px;
    padding: 20px 0;
}
.des-list-item .right{
    float: right;
    width: 50px;
    text-align: right;
    padding-top: 20px;
}
.des-list-item .right p{
    font-size: 20px;
}
.des-list-item .left:hover{
    color:whitesmoke;
    cursor: pointer;
}
.des-list-item-info{
    font-size: 13px;
}
.des-list-item-title{
    font-size: 16px;
    margin-bottom:10px;
}
.des-list-item-tags{
    margin:0 10px;
}
.des-list-item-tag{
    margin-right: 5px;
}
</style>
