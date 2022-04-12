const electron = require('electron');
const url = require('url');
const path = require('path');
const { dirname } = require('path');

const { app, BrowserWindow } = electron;

let mainWindow;

app.on('ready', function () {
    mainWindow = new BrowserWindow({
        width: 1300,
        height: 800,
        resizable: false,
    });
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'src/landing.html'),
        protocol: 'file',
        slashes: true
    }))
})