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

                v-bind="modal.props"

                @close="onModalClose(idx)"
                
                class="modal"
            ></component>
        </div>

        <transition name="dml">
            <div v-if="onLoading" class="loading-layout">
                <d-m-l />
            </div>
        </transition>
    </div>
</template>

<script>
import Vue from 'vue'
import DML from '@/des-layout/inner-component/des-modal-loading';

export default {
    name: 'Boot',
    components: {
        "d-m-l": DML
    },
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
        modals: [],
        onLoading: false
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

        Vue.prototype.$loading = time => {
            this.onLoading = true; 

            let endLoading = () => (this.onLoading = false);  

            if (time) endLoading.timeout = Promise((res, rej) => {
                setTimeout(() => {
                    this.onLoading = false; 
                    res(); 
                }, time); 
            }); 

            return endLoading; 
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
            transform: translateX(-50%) translateY(calc(-110% - 30px))

    .loading-layout
        position: fixed
        z-index: 999
        bottom: 0
        right: 0
        padding: 16px 20px

        
        
</style>

<style>
.color-main {
    color: rgb(92, 81, 99);
}

.color-main-bg {
    background-color: rgb(92, 81, 99);
}

.dml-enter-active, .dml-leave-active {
    transition: all .5s;
}

.dml-enter, .dml-leave-to /* .fade-leave-active below version 2.1.8 */ {
    /* opacity: 0; */
    transform: translateY(120%) scale(1.5); 
}
</style>

