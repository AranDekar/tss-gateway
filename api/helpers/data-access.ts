import { Mongoose } from "mongoose";

import * as shared from '../helpers';

export class DataAccess {
    public static mongooseInstance: Mongoose;

    public static connect(): Mongoose {
        if (DataAccess.mongooseInstance) {
            return DataAccess.mongooseInstance;
        }

        // mongoose
        this.mongooseInstance = new Mongoose();
        (<any>this.mongooseInstance).Promise = global.Promise;
        this.mongooseInstance.connection.once("open", () => {
            console.log("Conected to mongodb.");
        });
        this.mongooseInstance.connect(shared.Config.settings.mongo_db_connection_string, {
            useMongoClient: true,
        });
        return this.mongooseInstance;
    }

    constructor() {
        DataAccess.connect();
    }
}

DataAccess.connect();
