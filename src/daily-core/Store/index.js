const daily_dir = require('./daily_dir'); 
const configer = require('./configer'); 

configer.init(); 

const gitter = require('./gitter'); 

const qnx = require('./qnx'); 

let qiniu_config = configer.data.qiniu; 

configer.data.qiniu && qnx.init(
    qiniu_config.ak,
    qiniu_config.sk,
    qiniu_config.domain,
    qiniu_config.bucket
); 

let store = {
    configer,
    gitter,
    qnx,
    daily_dir,
    reconfig: config_data => {
        // 重新配置 configer 
        configer.data = config_data; 
        configer.save(); 
    
        let qiniu_config = configer.data.qiniu; 
    
        // 重新配置七牛 
        qnx.init(
            qiniu_config.ak,
            qiniu_config.sk,
            qiniu_config.domain,
            qiniu_config.bucket
        ); 
    
        // 重新配置 
        gitter.ready = gitter.init(); 
    }
}

module.exports = store;
