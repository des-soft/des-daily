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
            height: '60px',
            width: '100%'
        }
    }, 
    // 第二行 
    [ // 第二行的内部 
        {
            component: {
                template: `
                    <div>占位</div>
                `
            }, 
            style: {
                'vertical-align': 'top', 
                'width': '100px',
                // resize: 'horizontal',
                // overflow: 'auto'
            }
        },
        {
            component: DesAside, 
            style: {
                'vertical-align': 'top', 
                'width': '100px',
                // resize: 'horizontal',
                // overflow: 'auto'
            }
        },
        {
            component: 'd-resizer',
            style: {
                height: '500px'
            }
        },
        // Editor 
        {
            component: DesEditor, 
            style: {
                'vertical-align': 'top', 
                width: '500px'
            }
        },
        {
            component: {
                template: `
                    <div>占位</div>
                `
            }, 
            style: {
                'vertical-align': 'top', 
                'width': '100px',
                // resize: 'horizontal',
                // overflow: 'auto'
            }
        },
    ]
]); 


// new Vue({
//     el: '#app',
//     render: h => h(App)
// })