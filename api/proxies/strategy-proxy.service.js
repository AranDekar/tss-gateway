"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request");
const api = require("../../api");
const proxies = require("../proxies");
class StrategyProxyService extends proxies.ProxyBaseService {
    constructor() {
        super(api.helpers.Config.settings.strategies_base_path);
    }
    async get(id = null) {
        const localVarPath = this.basePath;
        let queryParameters = {};
        let headerParams = this.extendObj({}, this.defaultHeaders);
        let formParams = {};
        if (id !== undefined) {
            queryParameters['_id'] = id;
        }
        let useFormData = false;
        let requestOptions = {
            method: 'GET',
            qs: queryParameters,
            headers: headerParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        this.authentications.api_key.applyToRequest(requestOptions);
        this.authentications.default.applyToRequest(requestOptions);
        if (Object.keys(formParams).length) {
            if (useFormData) {
                requestOptions.formData = formParams;
            }
            else {
                requestOptions.form = formParams;
            }
        }
        return new Promise((resolve, reject) => {
            request(requestOptions, (error, response, body) => {
                if (error) {
                    reject(error);
                }
                else {
                    if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                        resolve({ response: response, body: body });
                    }
                    else {
                        reject({ response: response, body: body });
                    }
                }
            });
        });
    }
    async create(strategy) {
        const localVarPath = this.basePath + '/strategies';
        let queryParameters = {};
        let headerParams = this.extendObj({}, this.defaultHeaders);
        let formParams = {};
        // verify required parameter 'strategy' is not null or undefined
        if (strategy === null || strategy === undefined) {
            throw new Error('Required parameter strategy was null or undefined when calling post.');
        }
        let useFormData = false;
        let requestOptions = {
            method: 'POST',
            qs: queryParameters,
            headers: headerParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: strategy,
        };
        this.authentications.default.applyToRequest(requestOptions);
        if (Object.keys(formParams).length) {
            if (useFormData) {
                requestOptions.formData = formParams;
            }
            else {
                requestOptions.form = formParams;
            }
        }
        return new Promise((resolve, reject) => {
            request(requestOptions, (error, response, body) => {
                if (error) {
                    reject(error);
                }
                else {
                    if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                        resolve({ response: response, body: body });
                    }
                    else {
                        reject({ response: response, body: body });
                    }
                }
            });
        });
    }
    /**
 * starts backtesting a strategy
 * @param instrument the instrument in which the stratgey is backtested
 * @param strategy the strategy to be backtested
 * @param payload the payload which contains a description for the backtest
 */
    backtest(instrument, strategy, payload) {
        const localVarPath = this.basePath + '/backtest';
        let queryParameters = {};
        let headerParams = Object.assign({}, this.defaultHeaders);
        let formParams = {};
        // verify required parameter 'instrument' is not null or undefined
        if (instrument === null || instrument === undefined) {
            throw new Error('Required parameter instrument was null or undefined when calling backtest.');
        }
        // verify required parameter 'strategy' is not null or undefined
        if (strategy === null || strategy === undefined) {
            throw new Error('Required parameter strategy was null or undefined when calling backtest.');
        }
        if (instrument !== undefined) {
            queryParameters['instrument'] = instrument;
        }
        if (strategy !== undefined) {
            queryParameters['strategy'] = strategy;
        }
        let useFormData = false;
        let requestOptions = {
            method: 'PATCH',
            qs: queryParameters,
            headers: headerParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: payload,
        };
        this.authentications.api_key.applyToRequest(requestOptions);
        this.authentications.default.applyToRequest(requestOptions);
        if (Object.keys(formParams).length) {
            if (useFormData) {
                requestOptions.formData = formParams;
            }
            else {
                requestOptions.form = formParams;
            }
        }
        return new Promise((resolve, reject) => {
            request(requestOptions, (error, response, body) => {
                if (error) {
                    reject(error);
                }
                else {
                    if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                        resolve({ response: response, body: body });
                    }
                    else {
                        reject({ response: response, body: body });
                    }
                }
            });
        });
    }
}
exports.StrategyProxyService = StrategyProxyService;
//# sourceMappingURL=strategy-proxy.service.js.map