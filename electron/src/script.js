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
      "</p></div></div>";
  }

  for (const x in user_string) {
    document.querySelector(".visitor-data").innerHTML += user_string[x];
  }
});
