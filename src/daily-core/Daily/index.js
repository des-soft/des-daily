const path = require('path')
    , fs = require('then-fs')
    , parse = require('./parse')
    , chokidar = require('chokidar')

class Daily { 
    /**
     * @description Daily constructor 
     * @param { String } file_path 文件绝对路径
     */
    constructor(file_path) {
        this.file_path = file_path; 

        this.data = null; 

        // 绑定 watcher 
        this.watcher = chokidar.watch(file_path); 
    }

    /**
     * @description 如果 data 存在，则不刷新数据，如果 data 不存在就刷新数据。
     * @returns { Promise<Daily> }
     */
    fresh() {
        if (this.data) {
            return Promise.resolve(this); 

        } else {
            return this.read().then(data => { 
                this.data = data; 
                return this; 
            }); 

        }
    }

    /**
     * @description 从磁盘中读取 file_path 返回 Promise 
     * @returns { Promise<String> } 
     */
    read() {
        return fs.readFile(this.file_path)
            .then(e => e.toString())
            .then(parse) 
    }
}

module.exports = Daily; 
