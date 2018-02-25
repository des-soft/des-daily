import $bridge from '@/daily-core/Bridge/client.js';
import moment from 'moment';

let Q = {};

let pageSize = 15;
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

Q.pagination = page => {
    return $bridge.req(
        'DPool/collector'
    ).then(list => {
        let sortedList = sortByDate(list);
        return sortedList.slice((page - 1) * pageSize, page * pageSize)
    })
}

Q.date = date => {
    return $bridge.req(
        'DPool/collector'
    ).then(list => {
        return sortByDate(list.filter(e => {
            return moment(e.meta.date).isSame(date,'day')
        }))
    })
}

function sortByDate(list) {
    return list.sort((a, b) => {
        return new Date(b.meta.date) - new Date(a.meta.date)
    })
}

// for debug 
window.Q = Q;

export default Q;