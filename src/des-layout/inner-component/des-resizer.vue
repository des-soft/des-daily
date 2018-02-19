<template>
    <div class="des-resizer"
        @mousedown="down"
        @mouseup="up"
        @mousemove="move"
        @mouseenter="enter"
        @mouseleave="leave"
    >
        +
    </div>
</template>

<script>
export default {
    name: 'des-resizer', 
    data(){
        return {
            isDown: false,
            first: {
                clientX: 0,
                clientY: 0
            },
            delta: {
                x: 0, 
                y: 0
            } 
        }
    }, 
    created(){
        
    },
    methods: {
        enter(e){
            this.isDown = false; 
        }, 
        up(e){
            console.log('up!', e); 
            this.isDown = false; 
        }, 
        move(e){
            if (!this.isDown) return; 

            let { clientX, clientY } = this.first; 

            // console.log('move'); 
            // console.log('cha', e.clientX - clientX, e.clientY - clientY); 

            this.first.clientX = e.clientX; 
            this.first.clientY = e.clientY; 

            let delta = {
                x: e.clientX - clientX, 
                y: e.clientY - clientY
            }

            this.delta = delta; 

            this.$emit('d-resize', delta); 
        },
        down(e){
            console.log('down!', e); 
            this.isDown = true; 

            this.first.clientX = e.clientX; 
            this.first.clientY = e.clientY; 
        }, 
        leave(e){
            if (!this.isDown) return ; 
            
            console.log('leave', e); 
            
            let fake_e = {}
            fake_e.clientX = e.clientX + 2 * this.delta.x; 
            fake_e.clientY = e.clientY + 2 * this.delta.y; 
            
            this.move(fake_e); 
        }
    }
}
</script>

<style>
.des-resizer {
    background-color: #333; 
    user-select: none;
    height: 100%; 
    width: 10px; 
    cursor: e-resize;
}
</style>


