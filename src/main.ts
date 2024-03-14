import { app, BrowserWindow } from "electron";

function createWindow() {
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadFile("views/index.html");
}

app.whenReady().then(createWindow);
