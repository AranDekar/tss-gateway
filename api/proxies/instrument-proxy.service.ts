import * as http from 'http';
import * as request from 'request';

import * as api from '../../api';
import * as proxies from '../proxies';

export class InstrumentProxyService extends proxies.ProxyBaseService {
    constructor() {
        super(api.helpers.Config.settings.instruments_base_path);
    }
    /*
    * Returns a list of instruments or a single one if provided the title
    * @param title The title of a specific instrument
    */
    public getInstruments(title?: string):
        Promise<{ response: http.ClientResponse; body: api.interfaces.Instrument[]; }> {
        const localVarPath = this.basePath;
        const queryParameters: any = {};
        const headerParams: any = this.extendObj({}, this.defaultHeaders);
        const formParams: any = {};

        if (title !== undefined) {
            queryParameters.title = title;
        }

        const useFormData = false;

        const requestOptions: request.Options = {
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
                (requestOptions as any).formData = formParams;
            } else {
                requestOptions.form = formParams;
            }
        }
        return new Promise<{ response: http.ClientResponse; body: api.interfaces.Instrument[]; }>((resolve, reject) => {
            request(requestOptions, (error, response, body) => {
                if (error) {
                    reject(error);
                } else {
                    if (response.statusCode && (response.statusCode >= 200 && response.statusCode <= 299)) {
                        resolve({ response, body });
                    } else {
                        reject({ response, body });
                    }
                }
            });
        });
    }
}
