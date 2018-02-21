const ipcRenderer = $require('electron').ipcRenderer;


let bridge = {}
let ipc_id = 0; 

bridge.req = function(ns){
    return new Promise((res, rej) => {
        ipcRenderer.once(ns + '/' + ipc_id, function(event, data){
            res(data); 
        }); 
        
        ipcRenderer.once(ns + '/' + ipc_id + '/err', function(event, data){
            rej(data); 
        }); 

        ipcRenderer.send(ns, ipc_id.toString()); 

        ipc_id = ipc_id + 1; 
    }); 
}

export default bridge; 

