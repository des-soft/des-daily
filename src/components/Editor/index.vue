<template>
    <div class="des-editor" @keypress="press">
        <div class="scroller">
            <pre spellcheck="false" class="editor__inner content" ref="cledit">{{ content }}</pre>
        </div>

        <div class="tool-bar"></div>
    </div>
</template>

<script>

import cledit from '../../cledit'
import Prism from 'prismjs'; 
require('./mdGrammar'); 

export default {
    name: 'des-editor', 
    props: {
        content: {
            type: String, 
            default: '# hello, des-editor\n\n嗯....\n'
        }
    },
    data(){
        return {
            text: '', 
            file_name: '',
            changed: false
        }
    },
    created(){
        window.desEditor = this; 
        this.text = this.content; 
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
                console.log(this.text); 
                this.$emit('save', this.text); 

                this.changed = false; 
            } else {
                this.changed = true; 
            }
        }, 

        init(file_name, init_text){
            this.file_name = _file_name; 
            this.text = init_text; 
            this.$refs.cledit.innerText = init_text; 
        }
    }
}
</script>

<style lang="sass">



.des-editor 
    display: block
    box-sizing: border-box
    padding: 12px 16px
    width: 100%
    height: 100%
    line-height: 1.5


    .scroller 
        width: 100% 
        height: 100%


    .content 
        width: 100%
        height: 100%
        tab-size: 4
        font-size: 18px
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
    
</style>
