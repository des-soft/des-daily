/**
 * 管理配置文件用的，暴露一个对象 configer
 *   configer.init 初始化，配置文件不存在的话自动创建
 *   configer.save 保存, 同步的 
 * 
 * 可以链式调用 
 */
const fs = require('fs')
    , path = require('path')
    , daily_dir = require('./daily_dir')
    , config_file = path.join(daily_dir, 'config.json')

let configer = {
    data: {}
}; 

module.exports = configer; 

/**
 * @returns { Object } configer
 */
configer.init = () => {
    try {
        let raw_data = fs.readFileSync(config_file).toString(); 
        configer.data = JSON.parse(raw_data); 
    } catch(err) {
        // 说明不存在，应该生成 
        console.log(`配置文件加载失败，${config_file}`); 
        console.log(`自动生成空配置文件`); 

        configer.save(); 
    }

    return configer; 
}

/**
 * @returns { Object } configer
 */
configer.save = () => {
    let data_json = JSON.stringify(configer.data); 

    fs.writeFileSync(config_file, data_json); 

    return configer; 
}