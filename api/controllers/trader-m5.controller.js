"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api = require("../../api");
async function create(req, res, next) {
    try {
        let traderProxy = new api.proxies.TraderM5ProxyService();
        let result = await traderProxy.create(req.body);
    }
    catch (err) {
        res.statusCode = 502; // bad gateway
        next(err);
    }
}
exports.create = create;
async function get(req, res, next) {
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
        let result = await traderProxy.get(userId, _id);
        res.json(result.body);
    }
    catch (err) {
        res.statusCode = 502; // bad gateway
        next(err);
    }
}
exports.get = get;
//# sourceMappingURL=trader-m5.controller.js.map