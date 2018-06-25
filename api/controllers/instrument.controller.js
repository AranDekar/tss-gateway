"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api = require("../../api");
async function getInstruments(req, res, next) {
    // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
    let title;
    if (req.swagger.params && req.swagger.params.title) {
        title = req.swagger.params.title.value;
    }
    const instrumentProxy = new api.proxies.InstrumentProxyService();
    try {
        const result = await instrumentProxy.getInstruments(title);
        res.json(result.body);
    }
    catch (err) {
        res.statusCode = 502; // bad gateway
        next(err);
    }
}
exports.getInstruments = getInstruments;
//# sourceMappingURL=instrument.controller.js.map