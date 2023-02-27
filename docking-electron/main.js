const electron = require("electron");
const { app, ipcMain, BrowserWindow, screen } = electron;
const path = require('path');

let win;
let isMaximized = false;
let size;
app.on("ready", (e) => {
  size = screen.getPrimaryDisplay().workAreaSize;
  win = new BrowserWindow({
    width: 1280,
    height: 800,
    resizable: false,
    frame: false,
    fullscreenable: true,
    backgroundColor: "transparent",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, './preload.js')
    },
  });
  app.setAppUserModelId("视塔对接工具");
  win.loadURL(__dirname + "/index.html");
  win.show();
  win.webContents.openDevTools({ mode: "detach" });
});

ipcMain.on("window-mini", () => {
  win.minimize();
});

ipcMain.on("window-toggleScreen", () => {
  isMaximized = !isMaximized;
  let h = isMaximized ? size.height : 800;
  let w = isMaximized ? size.width : 1280;
  win.setBounds({
    height: h,
    width: w,
    x: Math.floor((size.width - w) / 2),
    y: Math.floor((size.height - h) / 2),
  });
});
ipcMain.on('window-close', () => {
    win.close();
    win.destroy();
    app.quit();
    app.exit();
  })
