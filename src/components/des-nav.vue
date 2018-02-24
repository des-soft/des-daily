<template>
    <div class="des-nav">
        <div :class="[{active:active === 'timeline'},'des-nav-item']" @click="click('timeline')">时间轴</div>
        <div :class="[{active:active === 'calendar'},'des-nav-item']" @click="click('calendar')">日历</div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            active:'timeline'
        }
    },
    methods:{
        click(name){
            this.active = name;
            this.$emit('change',name)
        }
    }
}
</script>

<style>
.des-nav {
    position: relative;
    height: 50px;
    user-select: none;
}
.des-nav-item{
    position: absolute;
    bottom: 0;
    left:0;
    font-size: 18px;
    cursor: pointer;
}
.des-nav-item:nth-child(2){
    left: 80px;
}
.des-nav-item.active{
    font-size: 20px;
    color: white;
}
</style>
