"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
// this has to be here as we need db instance to be initialised
__export(require("./app-settings"));
__export(require("./data-access"));
__export(require("./jwt-token.service"));
__export(require("./swagger-config"));
__export(require("./startup.service"));
__export(require("./strategies/google"));
//# sourceMappingURL=index.js.map