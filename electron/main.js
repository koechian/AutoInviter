const electron = require('electron');
const url = require('url');
const path = require('path');
const { dirname } = require('path');
const { CLIENT_RENEG_LIMIT } = require('tls');
const ipc = electron.ipcMain;
const { app, BrowserWindow } = electron;

let mainWindow;

app.on('ready', function () {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 700,
        resizable: false,
        frame: false,
        icon: path.join(__dirname, '/custom.ico'),
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'src/landing.html'),
        protocol: 'file',
        slashes: true,
    }))

})

ipc.on('osEvents', (event, arg) => {
    if (arg == 'close') {
        app.quit();
    } else {
        if (arg == 'minimize') {
            mainWindow.minimize();

        }
    }
})

