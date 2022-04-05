const electron = require('electron');
const url=require('url');
const path=require('path');
const {app, BrowserWindow,Menu,ipcMain}=electron;
const shell=require('electron').shell;
const env = process.env.NODE_ENV || 'development';

let mainWindow;

app.on('ready',function(){

    // electron reloader

    if (env === 'development') {
        try {
            require('electron-reloader')(module, {
                debug: true,
                watchRenderer: true
            });
        } catch (_) { console.log('Error'); }    
    }

    mainWindow=new BrowserWindow({
        width:1200,
        height:700,
        resizable:false,
        frame:true,
        transparent:true,
        icon: __dirname + '/assets/custom.ico'
    });

    mainWindow.loadURL(url.format({
        pathname:path.join(__dirname,'Render/index.html'),
        slashes:true
    }));

    mainWindow.webContents.on('new-window', function(e, url) {
        e.preventDefault();
        shell.openExternal(url);
      });
      mainWindow.on('closed',function(){
          app.quit();
      })

    //   ipcMain.on('close_app',(event)=>{
    //       app.quit()
    //   })
//  pick up from here tommorow. ipc sender processes.
    const menuBar=Menu.buildFromTemplate(menu);
    Menu.setApplicationMenu(menuBar);

});

const menu=[]