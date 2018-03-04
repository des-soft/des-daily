<template>
    <div class="des-header color-main-bg"
        @mousedown="down"
        @mouseup="up"
        @mouseleave="leave">
        {{ desTitleText }}

        <div class="to-right">
            <font-awesome-icon @click="setting"
                class="header-icon"
                :icon="['fa', 'cog']"  />
            <font-awesome-icon @click="close"
                class="header-icon"
                :icon="['fa', 'times']"  />
        </div>
    </div>
</template>

<script>
let { remote } = $require('electron'); 

// 获取本渲染线程的 BrowserWindow 对象 
let win = remote.getCurrentWindow(); 

import DesConfig from '@/components/des-config'; 

// For Debug 
// window.win = win; 

export default {
    data(){
        return {
            id: Date.now(), 
            isDown: false,
            first: {
                screenX: 0, 
                screenY: 0
            },
            win_pos: [0, 0], 
            setting_opened: false,

            title_stack: []
        }
    },
    created(){
        let id = this.id; 
        this.$d_bus.$on(`d-drag-move-${id}`, e => this.move(e)); 
        this.$d_bus.$emit('d-resizer-reg', this); 

        // setTimeout(() => {
        //     this.setting(); 
        // }, 300); 

        this.$d_bus.$on('des-header/push', title => {
            this.title_stack.push(title); 
        }); 

        this.$d_bus.$on('des-header/pop', title => {
            this.title_stack.pop(); 
        }); 

        this.$d_bus.$on('des-header/pop-all', title => {
            this.title_stack = []; 
        }); 
    }, 
    computed: {
        desTitleText(){
            return this.title_stack[this.title_stack.length - 1] || 'Des Daily'; 
        }
    },
    methods: {
        move(e){
            if (!this.isDown) return; 

            let { screenX, screenY } = this.first; 

            let [x, y] = this.win_pos; 
            
            // 设置窗口位置
            win.setPosition(
                x + (e.screenX - screenX),
                y + (e.screenY - screenY)
            ); 
        }, 
        down(e){
            this.isDown = true;

            this.win_pos = win.getPosition(); 
            this.first.screenX = e.screenX; 
            this.first.screenY = e.screenY; 
        }, 
        close(e){
            win.close(); 
        },
        setting(){
            // ...
            if (this.setting_opened) return; 

            this.setting_opened = true; 
            this.$modal({
                component: DesConfig
            }).then(close => {
                this.setting_opened = false; 
                console.log('ok', close); 
            }); 
        }, 
        leave(e){
            this.isDown = false; 
        },
        up(e){
            this.isDown = false; 
        }
    }
}
</script>

<style scpoed>
.des-header {
    position: relative;
    z-index: 990;
    text-align: center; 
    padding: 0 1em; 
    box-sizing: border-box; 
    width: 100%; 
    height: 100%; 
    line-height: 36px; 
    font-family: Consolas, Menlo; 
    color: rgb(161, 149, 168); 
    user-select: none;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .2);
}

.to-right {
    position: absolute;
    line-height: 36px; 
    height: 36px; 
    right: 0;
    top: 0; 
    padding: 0 1em; 
}

.to-right > * {
    cursor: pointer;
}

.header-icon {
    margin-left: 2px; 
}
</style>
