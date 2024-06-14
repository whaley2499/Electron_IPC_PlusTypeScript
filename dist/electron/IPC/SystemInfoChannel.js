"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemInfoChannel = void 0;
var child_process_1 = require("child_process");
var SystemInfoChannel = /** @class */ (function () {
    function SystemInfoChannel() {
    }
    SystemInfoChannel.prototype.getName = function () {
        return 'system-info';
    };
    SystemInfoChannel.prototype.handle = function (event, request) {
        if (!request.responseChannel) {
            request.responseChannel = "".concat(this.getName(), "_response");
        }
        event.sender.send(request.responseChannel, { kernel: (0, child_process_1.execSync)('systeminfo | findstr /B /C:"OS Name" /C:"OS Version"').toString() });
    };
    return SystemInfoChannel;
}());
exports.SystemInfoChannel = SystemInfoChannel;
//# sourceMappingURL=SystemInfoChannel.js.map