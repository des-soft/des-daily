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

        // !!! 热更新 
        this.watcher.on('change', path => {
            this.data = null; 
        }); 
    }

    /**
     * @description 带缓存的 getData 
     * @returns { Promise<Daily> }
     */
    getData() {
        if (this.data) {
            return Promise.resolve(this); 
        } else {
            return this.read().then(data => { 
                data.file_path = this.file_path; 
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

    /**
     * @description 取消绑定
     */
    unbind() {
        this.watcher.close(); 
    }
}

module.exports = Daily; 
