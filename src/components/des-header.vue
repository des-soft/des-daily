<template>
    <div class="des-header color-main-bg"
        @mousedown="down"
        @mouseup="up"
        @mouseleave="leave">
        Des Daily
        <font-awesome-icon @click="close"
            class="to-right" :icon="['fa', 'times']" />
    </div>
</template>

<script>
let { remote } = $require('electron'); 

// 获取本渲染线程的 BrowserWindow 对象 
let win = remote.getCurrentWindow(); 

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
            win_pos: [0, 0]
        }
    },
    created(){
        let id = this.id; 
        this.$d_bus.$on(`d-drag-move-${id}`, e => this.move(e)); 
        this.$d_bus.$emit('d-resizer-reg', this); 
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
    padding: 0 1em; 
    box-sizing: border-box; 
    width: 100%; 
    height: 100%; 
    line-height: 36px; 
    font-family: Consolas, Menlo; 
    color: rgb(161, 149, 168); 
    user-select: none;
}

.to-right {
    position: absolute;
    line-height: 36px; 
    height: 36px; 
    right: 0;
    padding: 0 1em; 
    cursor: pointer;
}
</style>
