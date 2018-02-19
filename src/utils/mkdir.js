const fs = require('fs'); 

module.exports = path => {
    try {
        fs.mkdirSync(path); 
    } catch (err){}
}
