import $bridge from '@/daily-core/Bridge/client.js'; 

let Q = {}; 

/**
 * @description 定义 filter 
 * @param { String   }  name    filter 名字
 * @param { Function }  filter  定义
 */
Q.define = (name, filter) => {
    Q[name] = () => {
        return $bridge.req(
            'DPool/collector'
        ).then(filter)
    }

    return Q; 
}

// for debug 
window.Q = Q; 

export default Q; 
