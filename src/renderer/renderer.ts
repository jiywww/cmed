import { generateDummyUser } from "../utils/dummy";

// 在渲染进程中
const { ipcRenderer } = require("electron");

document
    .getElementById("loginForm")
    ?.addEventListener("submit", function (event) {
        event.preventDefault(); // 阻止表单默认提交行为

        const usernameElement = document.getElementById(
            "username"
        ) as HTMLInputElement;
        const passwordElement = document.getElementById(
            "password"
        ) as HTMLInputElement;

        if (usernameElement && passwordElement) {
            const username = usernameElement.value;
            const password = passwordElement.value;

            // 向主进程发送登录消息
            ipcRenderer.send("login-message", { username, password });
        } else {
            console.error("Username or password element is missing!");
        }
    });

// ipcRenderer.on("login-reply", (event, { success, error }) => {
//     if (success) {
//         // 登录成功的处理
//     } else {
//         alert(error); // 使用弹窗显示错误消息
//     }
// });

// 监听来自主进程的回复
ipcRenderer.on("login-reply", (event, { success, error }) => {
    const feedbackElement = document.getElementById("feedback");
    if (feedbackElement) {
        if (success) {
            feedbackElement.style.display = "none"; // 隐藏反馈消息
            // 进行页面跳转或其他操作
        } else {
            feedbackElement.textContent = error; // 显示错误消息
            feedbackElement.style.display = ""; // 显示反馈元素
        }
    } else {
        console.error("Feedback element not found");
    }
});

// DEV: 生成一个虚拟用户
document.getElementById("dummy")?.addEventListener("click", () => {
    generateDummyUser();
});
