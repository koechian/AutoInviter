const electron = require('electron');
const { ipcRenderer } = electron;


const close = document.getElementById('closeButton');

close.addEventListener('click', closeApp);

