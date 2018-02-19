"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request");
const api = require("../../api");
const proxies = require("../proxies");
class InstrumentProxyService extends proxies.ProxyBaseService {
    constructor() {
        super(api.helpers.Config.settings.instruments_base_path);
    }
    /*
    * Returns a list of instruments or a single one if provided the title
    * @param title The title of a specific instrument
    */
    getInstruments(title) {
        const localVarPath = this.basePath;
        const queryParameters = {};
        const headerParams = this.extendObj({}, this.defaultHeaders);
        const formParams = {};
        if (title !== undefined) {
            queryParameters.title = title;
        }
        const useFormData = false;
        const requestOptions = {
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
                    if (response.statusCode && (response.statusCode >= 200 && response.statusCode <= 299)) {
                        resolve({ response, body });
                    }
                    else {
                        reject({ response, body });
                    }
                }
            });
        });
    }
}
exports.InstrumentProxyService = InstrumentProxyService;
//# sourceMappingURL=instrument-proxy.service.js.map