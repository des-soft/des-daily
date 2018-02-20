const Store = require('../Store')
    , path = require('path')
    , mkdir = require('../../utils/mkdir')
    , fs = require('then-fs')
    , Daily = require('../Daily')
    , chokidar = require('chokidar')
    , { configer, gitter } = Store
    , { git_base } = gitter
    , DAILY_BASE = path.join(git_base, 'daily-base') 
    , { EventEmitter } = require('events')


// mkdir 
mkdir(DAILY_BASE); 

let DPool = new EventEmitter();  

module.exports = DPool; 

// DPool

// 只取 .md 文件 
let files_names = fs.readdirSync(DAILY_BASE).filter(e => e.endsWith('.md'));
// md 文件的绝对路径 
let files_paths = files_names.map(e => path.join(DAILY_BASE, e)); 

DPool.dailys = []; 

// DPool.dailys = files_paths.map(e => new Daily(e)); 

let watcher = chokidar.watch(DAILY_BASE); 

watcher.on('add', file_path => {
    let p = path.parse(file_path); 

    // 排除 md 文件 
    if (p.ext !== '.md') return; 

    // DPool
    let daily = new Daily(file_path); 

    DPool.dailys.push(daily)

    DPool.emit('add', daily); 
}); 

watcher.on('unlink', file_path => {
    DPool.dailys = DPool.dailys.filter(daily => {
        return !(daily.file_path === file_path); 
    });
}); 

DPool.collector = function(){
    return Promise.all(
        DPool.dailys.map(daily => {
            return daily.getData(); 
        })
    ); 
}

// setTimeout(() => {
//     console.log(DPool.dailys.length); 
// }, 3000); 


// collector().then(dailys => {
//     dailys.forEach(daily => {
//         console.log(daily.data.meta); 
//     })
// }); 
