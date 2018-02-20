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


let DPool = new EventEmitter();  

module.exports = DPool; 

// DPool

DPool.dailys = []; 

// git 服务准备好了 

let watcher = null; 

gitter.on('init', () => {
    // mkdir 
    mkdir(DAILY_BASE); 

    if (watcher) {
        watcher.close(); 
        DPool.dailys.forEach(d => d.unbind()); 
    }

    // init 
    let files_names = fs.readdirSync(DAILY_BASE).filter(e => e.endsWith('.md'))
    let files_paths = files_names.map(e => path.join(DAILY_BASE, e)); 
    DPool.dailys = files_paths.map(e => new Daily(e)); 

    // watcher 
    watcher = chokidar.watch(DAILY_BASE, {
        ignoreInitial: true
    }); 

    watcher.on('add', file_path => {
        console.log('added!', file_path); 

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
}); 

DPool.collector = () => gitter.ready.then(ok => {
    return Promise.all(
        DPool.dailys.map(daily => {
            return daily.getData(); 
        })
    ); 
})

// setTimeout(() => {
//     console.log(DPool.dailys.length); 
// }, 3000); 


// collector().then(dailys => {
//     dailys.forEach(daily => {
//         console.log(daily.data.meta); 
//     })
// }); 
