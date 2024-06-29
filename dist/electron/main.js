"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var SystemInfoChannel_1 = require("./IPC/SystemInfoChannel");
var Main = /** @class */ (function () {
    function Main() {
    }
    Main.prototype.init = function (ipcChannels) {
        electron_1.app.on('ready', this.createWindow);
        electron_1.app.on('window-all-closed', this.onWindowAllClosed);
        electron_1.app.on('activate', this.onActivate);
        this.registerIpcChannels(ipcChannels);
    };
    Main.prototype.onWindowAllClosed = function () {
        if (process.platform !== 'darwin') {
            electron_1.app.quit();
        }
    };
    Main.prototype.onActivate = function () {
        if (!this.mainWindow) {
            this.createWindow();
        }
    };
    Main.prototype.createWindow = function () {
        this.mainWindow = new electron_1.BrowserWindow({
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false
            },
            height: 600,
            width: 800,
            title: "New version of the electron application"
        });
        this.mainWindow.webContents.openDevTools();
        this.mainWindow.loadFile('../../index.html');
    };
    Main.prototype.registerIpcChannels = function (ipcChannels) {
        ipcChannels.forEach(function (channel) { return electron_1.ipcMain.on(channel.getName(), function (event, request) { return channel.handle(event, request); }); });
    };
    return Main;
}());
(new Main()).init([
    new SystemInfoChannel_1.SystemInfoChannel()
]);
//# sourceMappingURL=main.js.map