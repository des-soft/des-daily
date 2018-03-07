<style lang="sass">
$des-config-bg:     rgb(240, 239, 240)

.des-config 
    box-shadow: 0 34px 48px -20px rgba(0, 0, 0, .3)
    background-color: $des-config-bg
    width: 600px
    box-sizing: border-box
    padding: 20px 30px
    border: 1px solid #DDD
    border-radius: 0 0 4px 4px 
    line-height: 1.5

    [title]
        font-size: 140%
        margin-bottom: .5em

    .line 
        margin-top: 1em
        margin-bottom: .5em
        .fields 
            padding-left: 16px
            font-size: 110%
        input 
            font-family: Consolas, Menlo
            box-sizing: border-box
            margin-top: 1em
            display: block
            padding: .5em 16px
            border: none
            border-radius: 4px
            width: 100% 

            &:focus
                outline: none

            &[disabled]
                background-color: $des-config-bg

    hr 
        position: relative 
        width: 100%
        border: none
        border-bottom: 1px dashed #DDD

    [title] + hr
        margin-bottom: 2em
    
    .line + hr 
        margin: 1.5em 0

    hr::after 
        content: attr(text)
        position: absolute
        font-size: 80%
        color: #BBB
        line-height: 4px
        text-align: center
        background-color: $des-config-bg
        left: 35%
        width: 30%

    .btns 
        margin-top: 2em
        margin-bottom: 1em
        text-align: right
        .btn 
            cursor: pointer
            display: inline-block 
            padding: 4px 16px
            letter-spacing: 2px
            font-size: 80%
            border-radius: 4px
            margin-left: 1em

        [yes] 
            background-color: rgb(92, 81, 99)
            color: #DDD

        [no]
            background-color: #FFF
            color: #BBB
</style>

<template>
    <div class="des-config">
        <p title>{{ title }}</p>

        <hr />

        <div class="line" v-for="(lineKey, idx) in lineKeys" :key="idx">
            <p class="fields">{{ lineKey }} </p>

            
            <input type="text" v-for="(line, i) in lines[lineKey]" :key="i"
                :placeholder="line.placeholder"
                ref="inputs"
                v-once 
                :value="line.default || ''"
                :path="line.path" />
        </div>



        <!-- <hr text="以下为非必填项" /> -->

        <div class="btns">
            <span yes class="btn"
                @click="enter">
                <font-awesome-icon
                    class="header-icon"
                    :icon="['fa', 'check']"  />
                应用
            </span>

            <span no class="btn"
                @click="$emit('close')">
                <font-awesome-icon
                    class="header-icon"
                    :icon="['fa', 'times']"  />
                关闭
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'des-config', 
    props: {
        lines: {
            type: Object, 
            default: () => ({
                '日记文件信息': [
                    {
                        type: 'text', 
                        path: 'filename',
                        placeholder: '日记名'
                    },
                    {
                        type: 'text', 
                        path: 'time',
                        placeholder: '时间'
                    }
                ]
            })
        },
        title: {
            type: String, 
            default: '新建日记'
        }
    },
    data(){
        return {
            pool: {}, 
            onloading: false
        }
    }, 
    computed: {
        lineKeys(){
            return Object.keys(this.lines); 
        }
    },
    created(){
        window.desp = this; 
        // this.lineKeys.forEach(key => {
        //     let inputs = this.lines[key]; 

        //     inputs.forEach(input => {
        //         let { type, path, placeholder } = input; 

        //         this.pool.path = ''; 
        //     }); 
        // })
    }, 
    methods: {
        enter(){
            if (this.onloading) return; 

            console.log(this.$refs); 
            let data = this.$refs.inputs.reduce((data, $input) => {
                let path = $input.getAttribute('path'); 
                let val  = $input.value || ''; 

                let ps = path.split('/'); 

                let target = ps.slice(0, -1).reduce((data, p) => {
                    return data[p]; 
                }, data); 

                target[ps[ps.length - 1]] = val; 

                return data; 
            }, {}); 

            // console.log(data); 
            
            this.$emit('inputCommit', this, data); 
        }
    }
}
</script>


