const path = require('path')
    , README_FILE = path.join(__dirname, 'README.md')
    , Daily = require('./index')

let readme = new Daily(README_FILE); 

console.log('因为打开了 watcher 监听文件改动，所以需要按 ctrl + c 结束');

readme.fresh().then(() => {
    console.log(readme.data); 
}).catch(err => {
    console.log(err); 
})
