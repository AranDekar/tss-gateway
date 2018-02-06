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
function create(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let traderProxy = new api.proxies.TraderM5ProxyService();
            let result = yield traderProxy.create(req.body);
        }
        catch (err) {
            res.statusCode = 502; // bad gateway
            next(err);
        }
    });
}
exports.create = create;
function get(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let userId;
            if (req.user) {
                userId = req.user.id;
            }
            else {
                throw new Error('userId is required!');
            }
            let _id = undefined;
            if (req.swagger.params && req.swagger.params._id) {
                _id = req.swagger.params._id.value;
            }
            let traderProxy = new api.proxies.TraderM5ProxyService();
            let result = yield traderProxy.get(userId, _id);
            res.json(result.body);
        }
        catch (err) {
            res.statusCode = 502; // bad gateway
            next(err);
        }
    });
}
exports.get = get;
//# sourceMappingURL=trader-m5.controller.js.map