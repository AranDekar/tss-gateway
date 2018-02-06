import * as http from 'http';
import * as request from 'request';

import * as api from '../../api';
import * as proxies from '../proxies';

export class StrategyProxyService extends proxies.ProxyBaseService {
    constructor() {
        super(api.helpers.Config.settings.strategies_base_path);
    }
    public async get(id: string | null = null): Promise<{ response: http.ClientResponse, body: api.interfaces.Strategy[]; }> {
        const localVarPath = this.basePath;
        let queryParameters: any = {};
        let headerParams: any = this.extendObj({}, this.defaultHeaders);
        let formParams: any = {};


        if (id !== undefined) {
            queryParameters['_id'] = id;
        }

        let useFormData = false;

        let requestOptions: request.Options = {
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
                (<any>requestOptions).formData = formParams;
            } else {
                requestOptions.form = formParams;
            }
        }
        return new Promise<{ response: http.ClientResponse; body: api.interfaces.Strategy[]; }>((resolve, reject) => {
            request(requestOptions, (error, response, body) => {
                if (error) {
                    reject(error);
                } else {
                    if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                        resolve({ response: response, body: body });
                    } else {
                        reject({ response: response, body: body });
                    }
                }
            });
        });
    }

    public async create(strategy: api.interfaces.Strategy): Promise<{ response: http.ClientResponse; body: api.interfaces.Strategy; }> {
        const localVarPath = this.basePath + '/strategies';
        let queryParameters: any = {};
        let headerParams: any = this.extendObj({}, this.defaultHeaders);
        let formParams: any = {};


        // verify required parameter 'strategy' is not null or undefined
        if (strategy === null || strategy === undefined) {
            throw new Error('Required parameter strategy was null or undefined when calling post.');
        }

        let useFormData = false;

        let requestOptions: request.Options = {
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
                (<any>requestOptions).formData = formParams;
            } else {
                requestOptions.form = formParams;
            }
        }
        return new Promise<{ response: http.ClientResponse; body: api.interfaces.Strategy; }>((resolve, reject) => {
            request(requestOptions, (error, response, body) => {
                if (error) {
                    reject(error);
                } else {
                    if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                        resolve({ response: response, body: body });
                    } else {
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
    public backtest(instrument: string, strategy: string, payload?: {
        description: string;
    }): Promise<{ response: http.ClientResponse; body: api.interfaces.EventResponse; }> {
        const localVarPath = this.basePath + '/backtest';
        let queryParameters: any = {};
        let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
        let formParams: any = {};


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

        let requestOptions: request.Options = {
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
                (<any>requestOptions).formData = formParams;
            } else {
                requestOptions.form = formParams;
            }
        }
        return new Promise<{ response: http.ClientResponse; body: api.interfaces.EventResponse; }>((resolve, reject) => {
            request(requestOptions, (error, response, body) => {
                if (error) {
                    reject(error);
                } else {
                    if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                        resolve({ response: response, body: body });
                    } else {
                        reject({ response: response, body: body });
                    }
                }
            });
        });
    }
}
