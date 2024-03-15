import { app, BrowserWindow } from "electron";
import path from "path";
import { initDB, closeDB } from "./db";
import { verifyUser } from "./authentication";

const { ipcMain } = require("electron");

ipcMain.on("login-message", async (event, { username, password }) => {
    try {
        // 假设有一个函数用于验证用户名和密码
        const userIsValid = await verifyUser(username, password);
        if (userIsValid) {
            // 向渲染进程发送登录成功的消息
            event.reply("login-reply", { success: true });
            console.log("登录成功");
            sessionStorage.setItem("username", username);
            sessionStorage.setItem("isLogin", "true");
        } else {
            // 或者发送登录失败的消息
            event.reply("login-reply", {
                success: false,
                error: "用户名或密码错误",
            });
        }
    } catch (error: unknown) {
        let errorMessage = "发生未知错误";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        event.reply("login-reply", { success: false, error: errorMessage });
    }
});

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
    // DEV: 打开开发者工具
    mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
    initDB();
    createWindow();
});

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

app.on("window-all-closed", () => {
    // if (process.platform !== "darwin") {
    //     app.quit();
    // }
    app.quit();
});

app.on("will-quit", () => {
    closeDB();
    console.log("Quitting application");
});
