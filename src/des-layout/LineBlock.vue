<template>
    <div :class="{
        'd-line': isArray(blocks), 
        'd-block': !isArray(blocks)
    }">
        <!-- <div class="d-inner"> -->
            <!-- d-line-block 就是指本组件，在 './index.js' 里声明 -->
            <!-- 如果是数组，递归的实例化 -->

            <!-- <d-line-block
                v-if="isArray(block)"
                :blocks="block">
            </d-line-block> -->

            <!-- 如果不是数组，直接显示 -->
            <component @d-resize="e => $emit('d-resize', e)" v-if="!isArray(blocks)"
                class="d-block"
                :is="blocks.component"
                :class="blocks.class"
            ></component>

            <d-line-block v-else
                :key="idx" v-for="(block, idx) in blocks"
                :blocks="block"
                @d-resize="e => resize(e, idx)"
                :style="block.style"
                :class="block.class"
            ></d-line-block>
        <!-- </div> -->
    </div>
</template>

<script>
// 递归组件 
export default {
    name: 'des-layout', 
    props: {
        // blocks 是嵌套的数组。 
        blocks: {
            type: [Array, Object], 
            default: []
        }
    }, 
    data(){
        return {

        }
    }, 
    computed: {

    }, 
    created(){
        
    }, 
    methods: {
        resize(e, idx){
            let prev = this.blocks[idx - 1]; 
            let next = this.blocks[idx + 1]; 

            if (!prev || !next) {
                return console.warn('Resize 放在错误的位置了'); 
            }

            let prevNew = parseInt(prev.style.width) + e.x;
            let nextNew = parseInt(next.style.width) - e.x;

            if(parseInt(prev.style.minWidth.slice(0,-2)) >= prevNew || parseInt(next.style.minWidth.slice(0,-2)) >= nextNew){
                return;
            }

            prev.style.width = prevNew + 'px'; 
            next.style.width = nextNew + 'px'; 
        }, 
        isArray(_){
            return Array.isArray(_); 
        }
    }
}
</script>

<style>
.d-block {
    position: relative;
    display: inline-block;
    font-size: 16px; 
}

.d-line {
    position: relative;
    display: block;
    font-size: 0; 
}
</style>

