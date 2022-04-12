const { ipcRenderer } = require('electron');
const shell = require('electron').shell

const links = document.querySelectorAll('a[href]')

Array.prototype.forEach.call(links, function (link) {
    const url = link.getAttribute('href')
    if (url.indexOf('http') === 0) {
        link.addEventListener('click', function (e) {
            e.preventDefault()
            shell.openExternal(url)
        })
    }
})

document.querySelector('#closeButton').addEventListener('click', () => {
    ipcRenderer.send('osEvents', 'close')
})
document.querySelector('#minimizeButton').addEventListener('click', () => {
    ipcRenderer.send('osEvents', 'minimize')
})
