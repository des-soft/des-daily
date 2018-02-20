/**
 * gitter 工具 
 * 比如这样使用： 
 * 
 * gitter.saveAll('喵啦').then ... 
 * 相当于
 * git add ./* && git commit -m "喵啦" && git push origin master 
 * 
 * 利用了 simple-git 来构造
 */
const configer = require('./configer');
const daily_dir = require('./daily_dir'); 
const path = require('path'); 
const git = require('simple-git'); 
const git_base = path.join(daily_dir, 'git_base'); 
const { EventEmitter } = require('events'); 

// mkdir 
const mkdir = require('../../utils/mkdir'); 

// rm -rf 
const rimraf = require('rimraf-then'); 

mkdir(git_base);

// 让 simple-git cd 到 git_base 
const git_shell = git(git_base); 
let gitter = new EventEmitter(); 

gitter.git_base = git_base; 

module.exports = gitter; 

function initRepo(git_url){
    return new Promise((res, rej) => {
        git(daily_dir).raw([
            `clone`,
            git_url,
            git_base 
        ], (err, git_res) => {
            if (err) rej(err); 
            else res(git_res); 
        }); 
    });
}

function pullRepo(){
    return new Promise((res, rej) => {
        git_shell.raw([
            'pull',
            'origin',
            'master'
        ], (err, git_res) => {
            if (err) rej(err); 
            else res(git_res)
        }); 
    }); 
}

gitter.promisify = function(cmd){
    return (...args) => {
        return new Promise((res, rej) => {
            args.push((err, git_res) => {
                if (err) rej(err); 
                else res(git_res); 
            }); 

            git_shell[cmd](...args); 
        })
    }
}

gitter.add = gitter.promisify('add'); 
gitter.commit = gitter.promisify('commit'); 
gitter.push = gitter.promisify('push'); 
gitter.checkIsRepo = gitter.promisify('checkIsRepo'); 

gitter.saveAll = function(msg){
    return gitter.add('./*').then(ok => {
        return gitter.commit(msg); 
    }).then(commit_ok => {
        return gitter.push(['origin', 'master']); 
    }); 
}

gitter.init = function(){
    let { git_url } = configer.data; 

    if (!git_url) {
        console.log('git_url Not Found');
        return Promise.resolve('config.git_url not found'); 
    }

    return gitter.checkIsRepo().then(isRepo => {
        if (isRepo){
            // 嗯。。。 
            return pullRepo(); 
        } else {
            // 不是仓库 
            console.log('不是仓库'); 
            rimraf(git_base); 

            return initRepo(git_url); 
        }
    }).catch(err => {
        return `all done but with some problem: ${err}`; 
    }).then(ok => {
        gitter.emit('init'); 
        return ok; 
    })
}

gitter.ready = gitter.init(); 
