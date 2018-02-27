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

        // ipcMain.on('Store/reconfig', (event, ipc_id, config) => {
        //     console.log('[ Bridge ] reconfig', config); 

        //     Store.reconfig(config).then(config_ok => {
        //         this.webContents.send(
        //             `Store/reconfig/${ipc_id}`,
        //             'ok'
        //         );
        //     })
        // }); 
        

        let pathCreate = (path, todo) => {
            console.log('[ Bridge Channel Reg ]', path); 

            ipcMain.on(path, (event, ipc_id, ...from_client_args) => {
                console.log(`[ Bridge ] ${path}, ipc_id:`, ipc_id); 

                todo(...from_client_args).then(data => {
                    this.webContents.send(
                        `${path}/${ipc_id}`,
                        data
                    ); 
                }).catch(err => {
                    this.webContents.send(
                        `${path}/${ipc_id}/err`,
                        err
                    ); 
                })
            })
        }

        pathCreate(
            'DPool/collector',
            () => DPool.collector().then(
                data => data.map(e => e.data)
            )
        ); 

        pathCreate(
            'Store/reconfig',
            config => Store.reconfig(config)
        ); 

        pathCreate(
            'Store/getConfig', 
            () => Promise.resolve(Store.configer.data)
        ); 


        // pathCreate(
        //     'Gitter/commit', 
        //     msg => Store.gitter.commit(msg)
        // ); 

        Store.gitter.cmds_promise.forEach(cmdKey => {
            pathCreate(
                `Gitter/${cmdKey}`, 
                (...args) => Store.gitter[cmdKey](...args)
            ); 
        }); 
    }
}

module.exports = Bridge; 

// DPool.on('add', function(){
//     ipcMain
// })

