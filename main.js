const { app, BrowserWindow  } = require('electron'); 

const path = require('path'); 
const url  = require('url'); 

console.log('on load'); 

let mainWindow; 

// app.commandLine.appendSwitch("chrome-flags", "--harmony_proxies"); 


function createWindow(){
    mainWindow = new BrowserWindow({
        width: 800,
        height: 1024, 
        frame: false,
        // transparent: true,
        // webPreferences: { experimentalFeatures: true }
        // experimentalFeatures
    })

    mainWindow.loadURL(url.format({
        // pathname: path.join(__dirname, 'index.html'),
        pathname: 'localhost:8081',
        // protocol: 'file:',
        protocol: 'http', 
        slashes: true
    })); 

    mainWindow.show(); 
}


app.on('ready', createWindow)