import Vue from 'vue'
import App from './App.vue'
import D from '../../des-layout/index'; 
import DesEditor from '../Editor/App'
import DesHeader from '../../components/des-header'; 
import DesAside from '../../components/des-aside'; 

Vue.use(D); 

D.$attach('#app', [
    // 第一行
    {
        component: DesHeader,
        style: {
            height: '36px',
            width: '100%'
        }
    }, 
    // 第二行 
    [ // 第二行的内部 
        {
            component: DesAside, 
            style: {
                'vertical-align': 'top', 
                'width': '190px',
                'height': '764px'
                // resize: 'horizontal',
                // overflow: 'auto'
            }
        },
        {
            component: 'd-resizer',
            style: {
                height: '764px',
                width: '5px'
            }
        },
        // Editor 
        {
            component: DesEditor, 
            style: {
                'vertical-align': 'top', 
                width: '1000px', 
                height: '764px'
            }
        }
    ]
]); 


// new Vue({
//     el: '#app',
//     render: h => h(App)
// })