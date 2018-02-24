const DPool = require('../DPool')
const Store = require('../Store')
const { ipcMain } = require('electron')

// Watch 

class Bridge {
    constructor(webContents){
        this.webContents = webContents; 

        this.init(); 
    }

    init(){
        DPool.on('add', path => {
            this.webContents.send('DPool/add', path); 
        });; 

        DPool.on('unlink', daily => {
            this.webContents.send('DPool/add', daily); 
        });

        ipcMain.on('Store/reconfig', (event, ipc_id, config) => {
            console.log('[ Bridge ] reconfig', config); 

            Store.reconfig(config).then(config_ok => {
                this.webContents.send(
                    `Store/reconfig/${ipc_id}`,
                    'ok'
                );
            })
        }); 

        ipcMain.on('DPool/collector', (event, ipc_id) => {
            console.log('[ Bridge ] DPool/collector, ipc_id:', ipc_id); 

            DPool.collector().then(data => {
                this.webContents.send(
                    `DPool/collector/${ipc_id}`,
                    data.map(e => e.data)
                ); 
            }).catch(err => {
                this.webContents.send(
                    `DPool/collector/${ipc_id}/err`,
                    err
                ); 
            })
        });
    }
}

module.exports = Bridge; 

// DPool.on('add', function(){
//     ipcMain
// })

