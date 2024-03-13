const { app, BrowserWindow } = require("electron");
const { spawn } = require("child_process");
let flaskProcess = null;

function createWindow() {
  flaskProcess = spawn("pipenv", ["run", "python", "../python-backend/app.py"]);

  // listen for standard output
  flaskProcess.stdout.on("data", (data) => {
    console.log(`Flask stdout: ${data}`);
  });

  // listen for standard error
  flaskProcess.stderr.on("data", (data) => {
    console.error(`Flask stderr: ${data}`);
  });

  // create the browser window
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // load the index.html of the app
  win.loadFile("src/index.html");
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  // quit flask process when app is closed
  if (flaskProcess !== null) {
    flaskProcess.kill();
  }
  app.quit();
});