"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api = require("../../api");
class UserService {
    async get(id = null) {
        if (id) {
            return await api.models.userModel.findById(id.toString()).exec();
        }
        else {
            return await api.models.userModel.find({}).exec();
        }
    }
    async create(user) {
        let model = new api.models.userModel(user);
        await model.save();
        return model;
    }
    async findOrCreate(username, providerUserProfile) {
        let user = await api.models.userModel.findOne({ username: username }).exec();
        if (user) {
            return user;
        }
        providerUserProfile.created = new Date().toISOString();
        providerUserProfile.updated = providerUserProfile.created;
        user = new api.models.userModel(providerUserProfile);
        await user.save();
        return user;
    }
    async setupSupreAdminUsers() {
        let user = await api.models.userModel.findByEmailAddress('aran.dehkharghani@gmail.com');
        if (user) {
            user.roles = ['user', 'admin'];
            user.save();
        }
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map