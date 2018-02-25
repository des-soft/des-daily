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
        <p title>[ des-daily ] 配置器</p>

        <hr />

        <div class="line">
            <p class="fields">Git Config</p>
            <input type="text" v-model="config.git_url" placeholder="https://{USER}:{PASSWORD}@abc.com/a.git" />
        </div>

        <hr text="以下为非必填项" />

        <div class="line">
            <p class="fields">Qiniu Config</p>
            <input type="text" v-model="config.qiniu.ak"     placeholder="***** Qiniu Access Key *****" />
            <input type="text" v-model="config.qiniu.sk"     placeholder="***** Qiniu Secret Key *****" />
            <input type="text" v-model="config.qiniu.bucket" placeholder="***** Qiniu Bucket     *****" />
            <input type="text" v-model="config.qiniu.domain" placeholder="***** Qiniu Domain     *****" />
        </div>

        <div class="btns">
            <span yes class="btn"
                @click="useConfig">
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
    data(){
        return {
            config: {
                git_url: '', 
                qiniu: {
                    ak: '',
                    sk: '',
                    bucket: '',
                    domain: ''
                }
            },
            onloading: false
        }
    }, 
    watch: {
        config(e){
            console.log('!'); 

            return e; 
        }
    },
    methods: {
        useConfig(){
            if (this.onloading) return; 

            let config = JSON.parse(JSON.stringify(this.config)); 

            // config
            this.onloading = true; 

            let closeLoading = this.$loading(); 
            
            this.$bridge.req('Store/reconfig', config).then(ok => {
                // it works 
                this.onloading = false;
                closeLoading(); 

                this.$d_bus.$emit('reconfig-success'); 
                
                this.$bridge.req('DPool/collector').then(console.log); 
            }).catch(err => {
                alert(err); 
            })
        }
    }
}
</script>


