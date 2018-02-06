"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request");
const api = require("../../api");
const proxies = require("../proxies");
class TraderM5ProxyService extends proxies.ProxyBaseService {
    constructor() {
        super(api.helpers.Config.settings.trader_M5_base_path);
    }
    /*
    * adds a new trader-m5 for a user using the strategy passed
    * @param body the required input for the event to create
    */
    create(payload) {
        const localVarPath = this.basePath + '/traders';
        let queryParameters = {};
        let headerParams = this.extendObj({}, this.defaultHeaders);
        let formParams = {};
        // verify required parameter 'body' is not null or undefined
        if (payload === null || payload === undefined) {
            throw new Error('Required parameter payload was null or undefined when calling create.');
        }
        let useFormData = false;
        let requestOptions = {
            method: 'POST',
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
    /**
    *
    * gets all trader-m5 for a user
    * @param userId the owner of the traders
    * @param id the optional trader id
    */
    get(userId, id) {
        const localVarPath = this.basePath + '/traders';
        let queryParameters = {};
        let headerParams = this.extendObj({}, this.defaultHeaders);
        let formParams = {};
        // verify required parameter 'userId' is not null or undefined
        if (userId === null || userId === undefined) {
            throw new Error('Required parameter userId was null or undefined when calling get.');
        }
        if (userId !== undefined) {
            queryParameters['userId'] = userId;
        }
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
}
exports.TraderM5ProxyService = TraderM5ProxyService;
//# sourceMappingURL=trader-m5-proxy.service.js.map