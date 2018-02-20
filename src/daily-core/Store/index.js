const configer = require('./configer'); 

configer.init(); 

const gitter = require('./gitter'); 

const qnx = require('./qnx'); 

let qiniu_config = configer.data.qiniu; 

qnx.init(
    qiniu_config.ak,
    qiniu_config.sk,
    qiniu_config.domain,
    qiniu_config.bucket
); 

let store = {
    configer,
    gitter,
    qnx
}

module.exports = store;
