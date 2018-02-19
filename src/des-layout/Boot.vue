<template>
    <div @mousemove="move"
         @mouseup="up"
         @mouseleave="leave"
         @mousedown="down"
    >
        <d-line-block :blocks="line_block_table"></d-line-block>
    </div>
</template>

<script>
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
        resizers: []
    },
    created(){
        this.$d_bus.$on('d-resizer-reg', resizer => {
            this.resizers.push(resizer); 
        }); 


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
        },
        down(e){
            this.isDown = true; 
        }
    }
}
</script>

<style>

</style>


