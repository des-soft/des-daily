const Store = require('../Store')
    , path = require('path')
    , mkdir = require('../../utils/mkdir')
    , fs = require('then-fs')
    , { configer, gitter } = Store
    , { git_base } = gitter
    , DAILY_BASE = path.join(git_base, 'daily-base') 
    , Daily = require('../Daily')


// mkdir 
mkdir(DAILY_BASE); 

module.exports = collector; 

function collector(){
    // 只取 .md 文件 
    let files_names = fs.readdirSync(DAILY_BASE).filter(e => e.endsWith('.md'));

    // md 文件的绝对路径 
    let files_paths = files_names.map(e => path.join(DAILY_BASE, e)); 


    let dailys = files_paths.map(e => new Daily(e)); 

    return Promise.all(
        dailys.map(daily => {
            return daily.getData(); 
        })
    ); 
}


// collector().then(dailys => {
//     dailys.forEach(daily => {
//         console.log(daily.data.meta); 
//     })
// }); 
