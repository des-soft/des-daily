<template>
    <div class="des-list-item">
        <h4 class="des-list-item-title">{{title}}</h4>
        <div class="des-list-item-info">
            <span class="des-list-item-time">{{time}}</span>
            <span class="des-list-item-tags">
                <span class="des-list-item-tag" v-for="tag in tags" :key="tag.id">#{{tag.name}}</span>
            </span>
            <span class="des-list-item-author">by {{author}}</span>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            title:'长夜漫漫',
            tags:[{
                id:1,
                name:'长夜漫漫'
            },{
                id:2,
                name:'长夜漫漫'
            }],
            time:'2018-01-01 12:11:11',
            author:'eczn'
        }
    }
}
</script>

<style>
.des-list-item {
    padding: 10px 5px 0;
}
.des-list-item:hover{
    color:whitesmoke;
}
.des-list-item-info{
    font-size: 13px;
}
.des-list-item-title{
    font-size: 16px;
    margin:10px 0;
}
.des-list-item-tags{
    margin:0 10px;
}
.des-list-item-tag{
    margin-right: 5px;
}
</style>
