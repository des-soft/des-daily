const path = require('path')
    , fs = require('fs')
    , HtmlWebpackPlugin = require('html-webpack-plugin')

// 页目录 
let pages_dir = path.join(__dirname, '../src/pages'); 
// 页名 
let pages_name = fs.readdirSync(pages_dir); 
// 页 js 路径
let pages_path = pages_name.map(
    e => path.join(pages_dir, e, 'main.js')
);

// log 
console.log('[ Pages Found ]'.padStart(16)); 

// 生成 webpack 需要的 entry 字段 
let pages_entry = pages_name.reduce((entry, page_name, idx) => {
    let page_path = pages_path[idx]; 

    entry[page_name] = page_path; 

    console.log(`${page_name}:`.padStart(16), `${page_path}`); 

    return entry; 
}, {}); 

// webpack 配置的 HtmlWebpackPlugin 们 
let pages_plugins = pages_name.map(page_name => {
    let page_name_小写的 = page_name.toLowerCase(); 

    return new HtmlWebpackPlugin({
        filename: `${ page_name_小写的 }.html`, 
        template: 'index.html', 
        chunks: [ page_name ], 
        inject: true
    }); 
}); 

// Exports 
module.exports = {
    pages_plugins, pages_entry
}
