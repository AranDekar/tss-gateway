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
class UserService {
    get(id = null) {
        return __awaiter(this, void 0, void 0, function* () {
            if (id) {
                return yield api.models.userModel.findById(id.toString()).exec();
            }
            else {
                return yield api.models.userModel.find({}).exec();
            }
        });
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            let model = new api.models.userModel(user);
            yield model.save();
            return model;
        });
    }
    findOrCreate(username, providerUserProfile) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield api.models.userModel.findOne({ username: username }).exec();
            if (user) {
                return user;
            }
            providerUserProfile.created = new Date().toISOString();
            providerUserProfile.updated = providerUserProfile.created;
            user = new api.models.userModel(providerUserProfile);
            yield user.save();
            return user;
        });
    }
    setupSupreAdminUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield api.models.userModel.findByEmailAddress('aran.dehkharghani@gmail.com');
            if (user) {
                user.roles = ['user', 'admin'];
                user.save();
            }
        });
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map