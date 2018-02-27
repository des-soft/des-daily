import $bridge from '@/daily-core/Bridge/client.js';
import moment from 'moment';

const pageSize = 15;

let Q = {
    calculus: {}
}


/**
 * @description 定义 filter 
 * @param { String   }  name    filter 名字
 * @param { Function }  filter  定义
 */
Q.define = (name, filter) => {
    Q.calculus[name] = filter;

    return Q;
}

/**
 * @description 将 String 形的 Function 转换并 bind 参数上去 
 * @param   { Function | String } fn 
 * @returns { Function } function
 */
Q.calcFn = fn => {
    if (typeof fn === 'string'){
        let [fn_name, ...args] = fn.split('/'); 
        let target_fn = Q.calculus[fn_name]; 
        
        return target_fn.bind(Q.calculus, ...args); 
    } else {
        return fn.bind(Q.calculus); 
    }
}

/**
 * @description 惰性的 Q.run 
 * @param { Function } fn 
 * @param { Array<Function> } fns 
 */
Q.of = (fn, fns = []) => {
    if (typeof fn === 'string') fn = Q.calculus[fn]; 
    fns.push(fn); 

    return {
        of:   fn => Q.of(fns), 
        exec: () => Q.run(Q.pipe(...fns))
    }
}

/**
 * @description 将 fns 组合成一个函数 
 * @param   { Array<Function | String> } fns  元素类型为 function 或者 string
 * @returns { Function } 返回组合好的函数 
 */
Q.pipe = (...fns) => {
    fns = fns.map(Q.calcFn); 

    return list => {
        return fns.reduce(
            (list, fn) => fn(list),
            list
        )
    }
}

/**
 * @description 将 fn 应用到 DPool/collector 的结果里
 * @param   { Function | String }    fn 
 * @returns { Promise<Array>    }    结果
 */
Q.run = fn => {
    fn = Q.calcFn(fn); 

    return $bridge.req('DPool/collector').then(fn); 
}



////////////    以下是 预定义的 Base Filter (即 Q.calculus 预设)    ////////////

// @total: x => x
Q.define('total', $ => $.length); 

// @sortByDate 按时间排序 
Q.define('sortByDate', list => {
    return list.sort((a, b) => {
        return new Date(b.meta.date) - new Date(a.meta.date)
    })
}); 

// @pagination 分页 
Q.define('pagination', (page, list) => {
    return list.slice(
        (page - 1)  *  pageSize,
         page       *  pageSize
    ); 
}); 
// ↑↑↑↑↑↑ ↓↓↓↓↓↓
// Q.pipe('pagination/2'); 
// 这样调用就可以把 2 赋给 page

Q.define('date', list => {
    return sortByDate(list.filter(e => {
        return moment(e.meta.time).isSame(date,'day')
    }))
})


// for debug 
window.Q = Q;

export default Q;
