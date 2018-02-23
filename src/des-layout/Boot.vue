<template>
    <div @mousemove="move"
         @mouseup="up"
         @mouseleave="leave"
         @mousedown="down"
         class="app">
        <d-line-block :blocks="line_block_table"></d-line-block>

        <div class="modal-container" v-if="modals.length !== 0">
            <component v-for="(modal, idx) in modals"
                :is="modal.component"
                :key="idx"
                :style="{ zIndex: (idx + 100) }"

                :class="{
                    hidden: modal.__hidden
                }"

                @close="onModalClose(idx)"
                
                class="modal"
            ></component>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'

export default {
    name: 'Boot',
    data: {
        first: {
            isDown: false,
            first: {
                clientX: 0,
                clientY: 0
            },
            delta: {
                x: 0, 
                y: 0
            }
        },
        resizers: [], 
        modals: []
    },
    created(){
        this.$d_bus.$on('d-resizer-reg', resizer => {
            this.resizers.push(resizer); 
        }); 

        Vue.prototype.$modal = modal => {
            console.log(modal); 
            modal.__hidden = true; 

            this.modals.push(modal); 

            setTimeout(() => {
                modal.__hidden = false; 
            }, 16); 

            let ret = new Promise(res => {
                modal.__onClose = res;
            }); 

            return ret; 
        }
    }, 
    methods: {
        move(e){
            this.resizers.forEach(resizer => resizer.move(e)); 
        },
        leave(e){
            
        },
        enter(e){
            // if (!this.isDown){
            //     this.resizers.forEach(r => r.isDown = false); 
            // }
        },
        up(e){
            this.isDown = false; 
            this.resizers.forEach(resizer => resizer.up(e)); 
        },
        down(e){
            this.isDown = true; 
        },
        onModalClose(idx){
            let modal = this.modals[idx]; 

            modal.__hidden = true; 

            setTimeout(() => {
                this.modals.splice(idx, 1); 
                modal.__onClose('嗯。。。 成功退出');
            }, 420); 
        }
    }
}
</script>

<style lang="sass">
.app 
    overflow: hidden
    color: #555
    font-family: Consolas, Menlo, "微软雅黑"

    .modal-container 
        position: fixed
        width: 100%
        height: 100%
        top: 0
        left: 0
        z-index: 100
        > * 
            position: absolute 
            left: 50%
            top: 36px 

        .modal 
            transition: all .4s 
            transform: translateX(-50%) translateY(0%)
        .modal.hidden   
            transform: translateX(-50%) translateY(-110%)
</style>

<style>
.color-main {
    color: rgb(92, 81, 99);
}

.color-main-bg {
    background-color: rgb(92, 81, 99);
}


</style>

