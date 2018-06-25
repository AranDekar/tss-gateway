"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api = require("../../api");
async function getStrategies(req, res, next) {
    // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
    let _id = null;
    if (req.swagger.params._id.value) {
        _id = req.swagger.params._id.value;
    }
    let strategyProxy = new api.proxies.StrategyProxyService();
    let strategyService = new api.services.StrategyService();
    try {
        let result = await strategyProxy.get(_id);
        let strategies = await strategyService.get(result.body);
        res.json(strategies);
    }
    catch (err) {
        res.statusCode = 502; // bad gateway
        next(err);
    }
}
exports.getStrategies = getStrategies;
async function backtest(req, res, next) {
    // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
    let instrument = req.swagger.params.instrument.value;
    let strategy = req.swagger.params.strategy.value;
    let payload = req.body;
    try {
        let strategyProxy = new api.proxies.StrategyProxyService();
        let response = await strategyProxy.backtest(instrument, strategy, payload);
        res.json(response);
    }
    catch (err) {
        res.statusCode = 502; // bad gateway
        next(err);
    }
}
exports.backtest = backtest;
async function postStrategies(req, res) {
    // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
    let strategyProxy = new api.proxies.StrategyProxyService();
    try {
        let result = await strategyProxy.create(req.body);
        /*
    let data: api.Strategy = {
        id: result.id,
        createdTime: result.createdTime,
        name: result.name,
        description: result.description,
        granularity: result.granularity,
        isActive: result.isActive,
    };
    */
        res.json(result.body);
    }
    catch (err) {
        throw new Error(err);
    }
}
exports.postStrategies = postStrategies;
//# sourceMappingURL=strategy.controller.js.map