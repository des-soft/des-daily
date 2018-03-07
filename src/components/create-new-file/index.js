import Vue from 'vue'; 
import DesPrompt from '../des-prompt'
import moment from "moment"
import $bridge from '@/daily-core/Bridge/client'; 

const init_word = `人的遗憾，出于期望不能实现的无奈，出于无法改变的既定事实，换言之，是一种揪心的无可奈何。 

当哪一天觉得这无可奈何也没啥的时候，这就是释然。 

我也一样。 `; 

let inputs = [
    {
        type: 'text', 
        path: 'filename',
        placeholder: '日记名（不包含后缀名）'
    },
    {
        type: 'text', 
        path: 'time',
        default: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
        placeholder: '时间'
    },
    {
        type: 'text', 
        path: 'author',
        placeholder: '作者'
    }
]; 

let createNewFile = () => new Promise(res => {
    Vue.prototype.$modal({
        component: DesPrompt,
        props: {
            lines: {
                // 传入 schema 自动渲染 
                '日记文件信息': inputs
            }
        },
        on: {
            // 内部提交 
            inputCommit(modal, data){
                modal.$emit('close'); 

                if (!data.filename) return; 

                $bridge.req('DPool/createNewFile', {
                    filename: data.filename, 
                    content: 'daily { \n' + 
                    `   title: ${ data.filename } \n` + 
                    `   time: ${ data.time } \n` +
                    `   author: ${ data.author } \n` +
                    `} \n` + 
                    `;;;;;; \n\n` + 
                    `${ init_word } \n\n`
                }).then(succ => {
                    console.log('succ', succ); 
                })

                res(data); 
            }
        }
    })
}); 

export default createNewFile; 
