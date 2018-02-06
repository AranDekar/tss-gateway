"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
class Config {
    static setup() {
        if (Config.settings) {
            return Config.settings;
        }
        console.log(`app running in ${process.env.NODE_ENV} mode`);
        if (process.env.NODE_ENV === 'development') {
            let _googleConfig = {
                clientId: '6029765980-omgeqg459lsshrr2de2u865m2e120pu9.apps.googleusercontent.com',
                clientSecret: 'ZFAqk09Ynj-b7OrHZ36p0oeJ',
                callbackUrl: 'http://localhost:10020/auth/google/callback',
            };
            let _apiKeys = {
                strategy: '1234',
            };
            this.settings = {
                gateway_base_path: 'http://localhost:10020',
                strategies_base_path: 'http://localhost:10030/strategies',
                instruments_base_path: 'http://localhost:10040/instruments',
                trader_M5_base_path: 'http://localhost:10050',
                ui_base_path: 'http://localhost:4200',
                expiration_jwt_minutes: 20,
                jwt_secret: 'secret',
                google: _googleConfig,
                apiKeys: _apiKeys,
                mongo_db_connection_string: process.env.MONGO || `mongodb://mongodb/tforex`,
                kafka_conn_string: process.env.KAFKA || 'kafka:9092',
            };
        }
        return this.settings;
    }
    constructor() {
        Config.setup();
    }
}
exports.Config = Config;
Config.setup();
//# sourceMappingURL=app-settings.js.map