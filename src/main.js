const { app, BrowserWindow, Notification  } = require('electron'); 


const path = require('path'); 
const url  = require('url'); 

const osHomedir = require('os-homedir');

console.log('on load'); 

let mainWindow; 

// app.commandLine.appendSwitch("chrome-flags", "--harmony_proxies"); 


function createWindow(){
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800, 
        frame: false,
        resizable: false, 
        movable: true,
        useContentSize: true, 
        hasShadow: true, // Mac Only 
        // transparent: true,
        titleBarStyle: 'customButtonsOnHover'
        // webPreferences: { experimentalFeatures: true }
        // experimentalFeatures
    }); 

    mainWindow.loadURL(url.format({
        // pathname: path.join(__dirname, 'index.html'),
        pathname: 'localhost:8080/calendar.html',
        // protocol: 'file:',
        protocol: 'http', 
        slashes: true
    })); 

    mainWindow.show(); 

    let n = new Notification({
        title: 'test',
        body: '喵啦'
    }); 

    console.log(n); 
    
    n.show(); 
}

const { ipcMain } = require('electron')


app.on('ready', createWindow)
