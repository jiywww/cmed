import { app, BrowserWindow } from "electron";
import path from "path";
import { initDB } from "../database/db";

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    mainWindow.loadFile(path.join(__dirname, "../renderer/index.html"));
}

app.whenReady().then(initDB, createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
