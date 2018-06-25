"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api = require("../../api");
class StartupService {
    static startup() {
        setTimeout(async () => {
            let service = new api.services.UserService();
            await service.setupSupreAdminUsers();
        }, 5000);
    }
}
exports.StartupService = StartupService;
StartupService.startup();
//# sourceMappingURL=startup.service.js.map