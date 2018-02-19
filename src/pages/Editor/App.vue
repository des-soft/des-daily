<template>
  <div class="des-editor">
    <div class="scroller">
      <pre spellcheck="false" class="editor__inner content">{{ content }}</pre>
    </div>
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
      text: ''
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

  }
}
</script>

<style>
.scroller {
  /* position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto; */
}

.des-editor {
  /* max-width: 800px; */
  /* margin: 0 auto; */
  /* padding: 50px 100px 200px; */
  /* color: rgba(0, 0, 0, 0.73); */
}

.content {
  tab-size: 4;
  font-size: 18px;
  /* font-family: consolas, menlo, Courier, monospace, Helvetica, sans-serif; */
  font-family: consolas, menlo;
  white-space: pre-wrap;
  word-wrap: break-word;
  word-break: normal;
}

* {
  line-height: 1.5;
}

pre:focus {
  outline: none;
}

.code {
  font-family: consolas, menlo, Courier, monospace;
  font-size: 1em;
}

.pre {
  color: #555;
  font-family: consolas, menlo, Courier, monospace;
  font-size: 1em;
  word-break: break-all;
}

.pre [class*="language-"] {
  color: #2f2f2f;
}

.pre * {
  font-size: inherit !important;
}

.tag {
  color: #555;
  font-weight: bold;
  font-family: Courier, monospace;
  font-size: 1em;
}

.tag .punctuation,
.tag .attr-value,
.tag .attr-name {
  font-weight: normal;
}

.latex,
.math {
  color: #555;
}

.entity {
  font-style: italic;
  font-family: Courier, monospace;
  font-size: 1em;
  color: #555;
}

.table {
  font-family: Courier, monospace;
  font-size: 1em;
}

.table * {
  font-size: inherit;
}

.comment {
  color: rgba(85, 85, 85, 0.4);
}

.keyword {
  color: #2f2f2f;
  font-weight: bold;
}

.code,
.img,
.imgref,
.cl-toc {
  background-color: #eee;
  border-radius: 4px;
  padding: 0.15em 0;
}

.cl-toc {
  font-size: 2.8em;
  padding: 0.15em;
}

.blockquote {
  font-weight: 300;
}

.h1,
.h2,
.h3,
.h4,
.h5,
.h6 {
  font-weight: 600;
}

.h1,
.h11 {
  font-size: 2em;
}

.h2,
.h22 {
  font-size: 1.5em;
}

.h3 {
  font-size: 1.17em;
}

.h4 {
  font-size: 1em;
}

.h5 {
  font-size: 0.83em;
}

.h6 {
  font-size: 0.75em;
}

.cl-hash {
  color: rgba(85, 85, 85, 0.4);
}

.cl,
.hr {
  color: rgba(85, 85, 85, 0.4);
  font-style: normal;
  font-weight: normal
}

.em,
.em .cl {
  font-style: italic;
}

.strong,
.strong .cl,
.term {
  font-weight: bold;
}

.cl-del-text {
  text-decoration: line-through
}

.url,
.email,
.cl-underlined-text {
  text-decoration: underline;
}

.linkdef .url {
  color: rgba(85, 85, 85, 0.4);
}

.fn,
.inlinefn,
.sup {
  position: relative;
  top: -0.5em;
  font-size: smaller;
}

.sub {
  position: relative;
  bottom: -0.25em;
  font-size: smaller;
}

.img {
  display: inline-block;
}

.img,
.imgref,
.link,
.linkref {
  color: rgba(85, 85, 85, 0.4);
}

.img .cl-underlined-text,
.link .cl-underlined-text {
  color: #2f2f2f;
}

.cl-title {
  color: #555;
}
</style>
