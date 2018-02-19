/**
 * des-layout: D
 * 
 * 应对桌面开发的布局器。 
 * 直接将 page 挂在 #app 上。 
 * 
 * 功能： 
 *     1. 负责页面的切分，切分为块 
 *     2. 填充块 
 *     3. 响应式消息传递 
 */

import LineBlock from './LineBlock'; 
import Vue from 'vue'; 
import DesResizer from './inner-component/des-resizer'; 

let D = {}

/**
 * 
 * @param { Vue } Vue 
 * @param { Object } option 
 */
D.install = function(Vue, option){
    Vue.prototype.$D = D; 
    Vue.component('d-line-block', LineBlock); 
    Vue.component('d-resizer', DesResizer); 
}

/**
 * 
 * @param { Array<Object> } line_block_table 
 */
D.$attach = function(el, line_block_table){
    
    let ins = new Vue({
        el,
        data: {
            line_block_table
        }, 
        template: `
            <div>
                <d-line-block :blocks="line_block_table"></d-line-block>
            </div>
        `
    });

    window.ins = ins; 

    return ins; 
    // [
    //     [
    //         {
    //             height: '20px', 
    //             component: 'header'
    //         }
    //     ], 
    //     [
    //         {
    //             width: '30%', 
    //             component: 'aside'
    //         },
    //         {
    //             width: '70%', 
    //             component: 'editor'
    //         },
    //     ]
    // ]

}

D.launch = function(){

}

export default D; 
