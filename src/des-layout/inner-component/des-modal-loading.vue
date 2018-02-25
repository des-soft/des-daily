<style>
@keyframes loading {
    from {
        transform: rotate(0deg);
    } to {
        transform: rotate(360deg);
    }
}

.dml-icon {
    
    animation-name: loading;
    animation-duration: .5s; 
    animation-iteration-count: infinite; 
    animation-timing-function: linear; 

}
</style>


<style lang="sass">
.d-m-l 
    .dml-icon 
        font-size: 64px

.d-m-l-top 
    margin-top: 36px

</style>

<template>
    <div class="d-m-l" :style="`color: ${color};`" :class="'d-m-l-' + position">
        <font-awesome-icon
            class="dml-icon"
            :icon="['fa', 'circle-notch']"  />
    </div>
</template>

<script>
export default {
    props: {
        position: {
            type: String, 
            default: 'top'
        },
        color: {
            type: String, 
            default: 'rgb(92, 81, 99)'
        }, 
        time: {
            default: 2000
        }
    },
    name: 'des-modal-loading', 
    data(){
        return {}
    },
    created(){
        setTimeout(() => {
            this.$emit('close'); 
        }, this.time);
    }
}
</script>


