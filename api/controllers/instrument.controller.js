"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const api = require("../../api");
function getInstruments(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
        let title;
        if (req.swagger.params && req.swagger.params.title) {
            title = req.swagger.params.title.value;
        }
        const instrumentProxy = new api.proxies.InstrumentProxyService();
        try {
            const result = yield instrumentProxy.getInstruments(title);
            res.json(result.body);
        }
        catch (err) {
            res.statusCode = 502; // bad gateway
            next(err);
        }
    });
}
exports.getInstruments = getInstruments;
//# sourceMappingURL=instrument.controller.js.map