const electron = $require('electron'); 
const { remote, ipcRenderer } = electron;

let bridge = {}
let ipc_id = 0; 

function getIpc_id(){
    let i = ipc_id + 1; 
    ipc_id = ipc_id + 1; 
    return i; 
}

bridge.req = function(ns, ...args){
    let ipc_id = getIpc_id();

    return new Promise((res, rej) => {
        ipcRenderer.once(ns + '/' + ipc_id, function(event, data){
            res(data); 
        }); 
        
        ipcRenderer.once(ns + '/' + ipc_id + '/err', function(event, data){
            rej(data); 
        }); 

        setTimeout(() => {
            ipcRenderer.send(ns, ipc_id.toString(), ...args); 
        }, 0); 
    }); 
}

// bridge.DPool = remote.require('./daily-core/DPool'); 

export default bridge; 

