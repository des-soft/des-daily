const beauty = require('./beauty')
    , dailyHeadParse = require('./daily-head-parse')

module.exports = parse; 

/**
 * @description 文件的解析器
 * @param { String } text 
 */
function parse(text){
    // 六个 ; 分割文章为头部和正文
    let arr = text.split(';;;;;;'); 

    if (arr.length < 2){
        // 不合法的文章 
        return null; 
    } else {
        let [ head_text, ...contents ] = arr;
        let content = contents.join(';;;;;;'); 

        let meta = getMetaFrom(head_text); 
        // meta 还需要预处理一下， 比如 tags 字段得转化成数组 


        return {
            meta: beauty(meta), 
            content: content
        }
    }
}

let selector_table = {
    json: e => JSON.parse(e),
    daily: dailyHeadParse,
    default: e => JSON.parse(e)
}

/**
 * @description 格式化头部 
 * @param { String } head 
 */
function getMetaFrom(head){
    head = head.trim(); 

    let middle_pos = head.indexOf('{'); 

    if (middle_pos === -1){
        // 不合法的 meta 
        return null; 
    } else {
        let selector_name = head.substring(0, middle_pos).trim().toLocaleLowerCase(); 

        let meta_text = head.substring(middle_pos); 

        let selector = selector_table[selector_name] || selector_table['default']; 
        let meta = null; 

        try {
            meta = selector(meta_text); 
        } catch (err) {
            console.log('Meta Parse Error'); 
            console.log(err); 
        }

        return meta; 
    }
}
