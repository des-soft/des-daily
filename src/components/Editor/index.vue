<template>
    <div class="des-editor" @keydown="file_path && press($event)">
        <div class="on-editor-edit" :class="{
            hidden: file_path
        }">
            <div class="scroller">
                <pre spellcheck="false" class="editor__inner content" ref="cledit">{{ content }}</pre>
            </div>

            <div v-if="file_path" class="tool-bar">
                <font-awesome-icon :icon="['fa', 'download']"
                    @click="toSave" />
                <font-awesome-icon :icon="['fa', 'times']"
                    @click="reset" />
            </div>
        </div>

        <div class="on-editor-wait" :class="{
            hidden: file_path
        }">
            <div class="wait-middle">
                <font-awesome-icon :icon="['fa', 'keyboard']" />
                <font-awesome-icon :icon="['fa', 'language']" />
                <p class="intro">Des Editor</p>
            </div>
        </div>
    </div>
</template>

<script>

import cledit from '../../cledit'
import Prism from 'prismjs'; 
import saveFile from './saveFile'; 

require('./mdGrammar'); 

export default {
    name: 'des-editor', 
    props: {
        content: {
            type: String, 
            default: ''
        }
    },
    data(){
        return {
            text: '', 
            file_path: '',
            changed: false
        }
    },
    watch: {
        file_path(new_val){
            this.$d_bus.$emit('des-header/push', this.file_path); 
        },
        changed(){
            console.log('changed', this.changed); 
            this.$d_bus.$emit('des-header/pop'); 

            if (this.changed){
                this.$d_bus.$emit(
                    'des-header/push',
                    '* ' + this.file_path
                ); 
            } else {
                this.$d_bus.$emit(
                    'des-header/push',
                    this.file_path
                ); 
            }
        }
    },

    created(){
        window.desEditor = this; 
        this.text = this.content; 

        this.$d_bus.$on('init-edit', daily => {
            let { conent, meta, file_path, text } = daily; 
            if (this.file_path === file_path) return; 

            this.$d_bus.$emit('des-header/pop'); 

            this.init(file_path, text); 
        })
    },
    mounted(){
        // 
        const $editor = this.$el.querySelector('.editor__inner');
        const $scroller = this.$el.querySelector('.scroller');

        let editor = cledit(
            $editor, $scroller
        );

        var prismGrammar = window.mdGrammar({
            fences: true,
            tables: true,
            footnotes: true,
            abbrs: true,
            deflists: true,
            tocs: true,
            dels: true,
            subs: true,
            sups: true
        })

        this.cl = editor; 

        editor.init({
            sectionHighlighter: function (section) {
                return Prism.highlight(section.text, prismGrammar)
            },
            // Optional (increases performance on large documents)
            sectionParser: text => {
                this.text = text; 
                this.$emit('change', text); 
                var offset = 0
                var sectionList = [];
                (text + '\n\n').replace(/^.+[ \t]*\n=+[ \t]*\n+|^.+[ \t]*\n-+[ \t]*\n+|^\#{1,6}[ \t]*.+?[ \t]*\#*\n+/gm, function (match, matchOffset) {
                    sectionList.push(text.substring(offset, matchOffset))
                    offset = matchOffset
                })
                sectionList.push(text.substring(offset))

                return sectionList
            }
        })
    },
    methods: {
        press(e){
            console.log(e); 
            if (e.ctrlKey && e.code === 'KeyS'){
                // ctrl + s 
                this.toSave(this.file_path, this.text); 
            } else {
                this.changed = true; 
            }
        }, 

        init(file_path, text){
            this.file_path = file_path; 
            this.text = text; 
            this.$refs.cledit.innerText = text; 
        },

        reset(){
            this.text = ''; 
            this.$refs.cledit.innerText = ''; 
            this.file_path = null; 
        },

        toSave(){
            this.$emit('save-edit', {
                text: this.text, 
                file_path: this.file_path
            }); 

            saveFile(this.file_path, this.text); 

            this.changed = false; 
        }
    }
}
</script>

<style lang="sass">
.des-editor 
    display: block
    position: relative
    box-sizing: border-box
    overflow: hidden
    padding: 10px 16px 0 16px
    width: 100%
    height: 100%
    line-height: 1.5

    .on-editor-edit
        height: 100%
        overflow: scroll
        transition: all .3s
        opacity: 0 
        // transform: scale(1.4)

        &.hidden 
            opacity: 1
            // transform: scale(1)

    .tool-bar 
        border-top: 1px solid #DDD
        color: rgb(161, 149, 168)
        padding: 0 16px
        line-height: 32px
        position: absolute
        width: 100%
        bottom: 0
        left: 0

        > * 
            cursor: pointer
    
    .scroller 
        width: 100% 
        height: 100%
        overflow: scroll

    .content 
        width: 100%
        height: 100%
        tab-size: 4
        font-size: 16px
        /* font-family: consolas, menlo, Courier, monospace, Helvetica, sans-serif; */
        font-family: consolas, menlo, "微软雅黑"
        white-space: pre-wrap
        word-wrap: break-word
        word-break: normal

        .cledit-section:nth-child(1)
            color: rgb(151, 139, 158)
            display: block
            position: relative

            &::after 
                z-index: -111
                position: absolute
                color: #FFF
                background-color: rgb(151, 139, 158)
                padding: 0 12px
                border-radius: 4px
                top: 0
                right: 0
                content: "Meta Info"
                opacity: .5

    pre:focus 
        outline: none

    .code 
        font-family: consolas, menlo, Courier, monospace
        font-size: 1em
    
    .pre 
        color: #555
        font-family: consolas, menlo, Courier, monospace
        font-size: 1em
        word-break: break-all

    .on-editor-wait 
        background-color: #FFF
        height: 100%
        width: 100%
        transition: all .5s

        &.hidden 
            height: 0
            opacity: 0 

        &.hidden .wait-middle
            left: 0%
            top: -100%
            transform: translate(0%, 0%)

        .wait-middle
            position: absolute
            color: rgb(161, 149, 168)
            width: 100%
            font-size: 64px
            text-align: center
            top: 50%
            left: 50%
            transform: translate(-50%, -55%)
            transition: all .5s

            .intro 
                font-size: 50%

// 编辑器文本样式 
$text-color:        rgb(85, 85, 85)
$gfm-bg-color:      rgb(45, 42, 46)

$text-color-link:           rgb( 85,  85, 145)
$text-color-link-space:     rgb(155, 155, 155)

$li-number:         rgb(150, 150, 160)
$ul-prompt:         rgb(150, 150, 160)

.editor__inner 
    color: $text-color
    line-height: 1.5

    .h1, .h2, .h3, .h4, .h5, .h6
        font-weight: bold

    .h1 
        display: inline-block
        font-size: 155%
    .h2
        font-size: 135%
    .h3 
        font-size: 125%
    .h4 
        font-size: 115%
    .h5 
        font-size: 105%
    .h5 
        font-size: 100%
    
    .link
        color: $text-color-link-space
        font-style: normal
        .cl-underlined-text
            color: $text-color-link
            text-decoration: underline
            font-style: italic
    .url 
        color: $text-color-link
        text-decoration: underline
        font-style: italic

    .img 
        color: $text-color-link-space
        font-style: normal
        .cl-src
            color: $text-color-link
            text-decoration: underline
            font-style: italic               

    .blockquote 
        font-style: italic

    .li 
        .cl-li 
            color: $li-number

    .p 
        .strong 
            font-weight: bold
        .em 
            font-style: italic
    
    .hr
        font-weight: bold
        font-style: italic
        font-size: 130%
        padding: 0
        margin: 0
        display: inline-block
        transform: scaleY(2)


    .gfm 
        border-radius: 4px
        font-size: 90%
        font-family: Consolas, Menlo, "微软雅黑"
        padding: 12px 16px
        display: block
        background-color: $gfm-bg-color
        color: #FFF

</style>