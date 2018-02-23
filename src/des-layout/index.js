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
import Boot from './Boot.vue'; 
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import fontawesome from '@fortawesome/fontawesome'
// import brands from '@fortawesome/fontawesome-free-brands'
import faCog from '@fortawesome/fontawesome-free-solid/faCog'
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes'
import faCheck from '@fortawesome/fontawesome-free-solid/faCheck'
fontawesome.library.add(faTimes); 
fontawesome.library.add(faCheck); 
fontawesome.library.add(faCog); 

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
    Vue.component('FontAwesomeIcon', FontAwesomeIcon); 

    Vue.prototype.$d_bus = new Vue(); 
}

/**
 * 
 * @param { Array<Object> } line_block_table 
 */
D.$attach = function(el, line_block_table){
    
    Boot.data = Object.assign(Boot.data, {
        line_block_table
    });
    Boot.el = el; 

    let ins = new Vue(Boot);

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
