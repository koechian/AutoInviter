const electron = require('electron');
const ipc = electron.ipcRenderer;


const closeButton = document.getElementById('closeButton');

close.addEventListener('click', closeApp());

function closeApp(e) {
    e.preventDefault();

    // ipc.send('closeApp');
    console.log('Button')

}