var crypto = require('crypto');
var md5 = null;
module.exports = function beauty(obj) {
    // 预设 
    obj.tags = obj.tags || ''; 

    // 过滤 
    if (typeof obj.tags === 'string') {
        let tags_str = obj.tags;

        obj.tags = tags_str.split(',').map(e => e.trim()).filter(e => e);
    }

    if (typeof obj.title === 'string') {
        md5 = crypto.createHash("md5");
        md5.update(obj.title)
        obj.id = md5.digest('hex')
    }

    if (typeof obj.time === 'string') {
        obj.time = +new Date(obj.time)
    }

    return obj;
}