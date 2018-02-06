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
function getStrategies(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
        let _id = null;
        if (req.swagger.params._id.value) {
            _id = req.swagger.params._id.value;
        }
        let strategyProxy = new api.proxies.StrategyProxyService();
        let strategyService = new api.services.StrategyService();
        try {
            let result = yield strategyProxy.get(_id);
            let strategies = yield strategyService.get(result.body);
            res.json(strategies);
        }
        catch (err) {
            res.statusCode = 502; // bad gateway
            next(err);
        }
    });
}
exports.getStrategies = getStrategies;
function backtest(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
        let instrument = req.swagger.params.instrument.value;
        let strategy = req.swagger.params.strategy.value;
        let payload = req.body;
        try {
            let strategyProxy = new api.proxies.StrategyProxyService();
            let response = yield strategyProxy.backtest(instrument, strategy, payload);
            res.json(response);
        }
        catch (err) {
            res.statusCode = 502; // bad gateway
            next(err);
        }
    });
}
exports.backtest = backtest;
function postStrategies(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
        let strategyProxy = new api.proxies.StrategyProxyService();
        try {
            let result = yield strategyProxy.create(req.body);
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
    });
}
exports.postStrategies = postStrategies;
//# sourceMappingURL=strategy.controller.js.map