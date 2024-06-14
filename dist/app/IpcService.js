"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IpcService = void 0;
var IpcService = /** @class */ (function () {
    function IpcService() {
    }
    IpcService.prototype.send = function (channel, request) {
        if (request === void 0) { request = {}; }
        // If the ipcRenderer is not available try to initialize it
        if (!this.ipcRenderer) {
            this.initializeIpcRenderer();
        }
        // If there's no responseChannel let's auto-generate it
        if (!request.responseChannel) {
            request.responseChannel = "".concat(channel, "_response_").concat(new Date().getTime());
        }
        var ipcRenderer = this.ipcRenderer;
        ipcRenderer.send(channel, request);
        // This method returns a promise which will be resolved when the response has arrived.
        return new Promise(function (resolve) {
            ipcRenderer.once(request.responseChannel, function (event, response) { return resolve(response); });
        });
    };
    IpcService.prototype.initializeIpcRenderer = function () {
        if (!window || !window.process || !window.require) {
            throw new Error("Unable to require renderer process");
        }
        this.ipcRenderer = window.require('electron').ipcRenderer;
    };
    return IpcService;
}());
exports.IpcService = IpcService;
//# sourceMappingURL=IpcService.js.map