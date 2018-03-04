import Vue from 'vue'

import D from '../../des-layout/index'; 
import DesEditor from '@/components/Editor/index.vue'
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
                'width': '490px',
                'height': '564px',
                'minWidth':'450px'
                // resize: 'horizontal',
                // overflow: 'auto'
            },
        },
        {
            component: 'd-resizer',
            style: {
                height: '564px',
                width: '5px'
            }
        },
        // Editor 
        {
            component: DesEditor, 
            style: {
                'vertical-align': 'top', 
                width: '500px', 
                height: '564px',
                'minWidth':'300px'
            }
        }
    ]
]); 