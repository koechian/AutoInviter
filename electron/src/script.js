const { ipcRenderer } = require("electron");
const shell = require("electron").shell;

const links = document.querySelectorAll("a[href]");

Array.prototype.forEach.call(links, function (link) {
  const url = link.getAttribute("href");
  if (url.indexOf("http") === 0) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      shell.openExternal(url);
    });
  }
});

ipcRenderer.send("fetch");

document.querySelector("#closeButton").addEventListener("click", () => {
  ipcRenderer.send("osEvents", "close");
});
document.querySelector("#minimizeButton").addEventListener("click", () => {
  ipcRenderer.send("osEvents", "minimize");
});
document.querySelector("#manual").addEventListener("click", () => {
  console.log("object");
  ipcRenderer.send("fileIO", "openManual");
});
document.querySelector("#log").addEventListener("click", () => {
  console.log("object");
  ipcRenderer.send("fileIO", "openLog");
});
ipcRenderer.on("data", function (evt, data) {
  let username = data["credentials"]["username"].split(/[@]/);

  document.querySelector("#host-data").innerHTML =
    "<span></span>" +
    username[0] +
    "<br><span>" +
    data["credentials"]["password"] +
    "</span>";

  let userdata = data["user_data"];

  let user_string = [];

  for (const x in userdata) {
    user_string[parseInt(x, 10)] =
      '<div class="card"><div class="card-details"><p id="visitor_name">' +
      userdata[x]["name"] +
      '</p><p class="visitor-details" id="visitor_email">' +
      userdata[x]["email"] +
      '</p><p class="visitor-details" id="visitor_number">' +
      userdata[x]["phone"] +
      '</p></div><div class="visitor-cards-right"><svg id="edit-visitor"class="visitor-icons edit-visitor" xmlns="http://www.w3.org/2000/svg"viewBox="0 0 640 512"><path d="M223.1 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 223.1 256zM274.7 304H173.3C77.61 304 0 381.7 0 477.4C0 496.5 15.52 512 34.66 512h286.4c-1.246-5.531-1.43-11.31-.2832-17.04l14.28-71.41c1.943-9.723 6.676-18.56 13.68-25.56l45.72-45.72C363.3 322.4 321.2 304 274.7 304zM371.4 420.6c-2.514 2.512-4.227 5.715-4.924 9.203l-14.28 71.41c-1.258 6.289 4.293 11.84 10.59 10.59l71.42-14.29c3.482-.6992 6.682-2.406 9.195-4.922l125.3-125.3l-72.01-72.01L371.4 420.6zM629.5 255.7l-21.1-21.11c-14.06-14.06-36.85-14.06-50.91 0l-38.13 38.14l72.01 72.01l38.13-38.13C643.5 292.5 643.5 269.7 629.5 255.7z"/></svg><svg id="remove-visitor"class="visitor-icons remove-visitor"xmlns="http://www.w3.org/2000/svg"viewBox="0 0 512 512"><path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM168 232C154.7 232 144 242.7 144 256C144 269.3 154.7 280 168 280H344C357.3 280 368 269.3 368 256C368 242.7 357.3 232 344 232H168z"/></svg></div>';
  }

  for (const x in user_string) {
    document.querySelector(".visitor-data").innerHTML += user_string[x];
  }
});
