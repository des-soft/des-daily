<template>
    <div class="des-nav">
        <div :class="[{active:active === 'timeline'},'des-nav-item']" @click="click('timeline')">时间轴</div>
        <div :class="[{active:active === 'calendar'},'des-nav-item']" @click="click('calendar')">日历</div>
        <des-button @click="edit" class="edit">
            <font-awesome-icon :icon="['fa', 'edit']"
                @click="newFileClick" />
        </des-button>
    </div>
</template>

<script>
import createNewFile from './create-new-file'
import DesButton from './des-button'
import DesPrompt from './des-prompt'

export default {
    components:{
        DesButton
    },
    data(){
        return {
            active:'timeline'
        }
    },
    methods:{
        click(name){
            this.active = name;
            this.$emit('change',name)
        },
        edit(){

        },
        newFileClick(){
            createNewFile().then(res => {
                console.log('nav', res); 
            })
        }
    }
}
</script>

<style>
.des-nav {
    position: relative;
    height: 35px;
    user-select: none;
    padding-right: 20px;
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
.des-nav .edit{
    float: right;
    margin-top:10px;
    font-size: 20px;
}
</style>
