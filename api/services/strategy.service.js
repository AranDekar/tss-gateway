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
class StrategyService {
    get(strategies) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = [];
            let userService = new api.services.UserService();
            for (let strategy of strategies) {
                let user = yield userService.get(strategy.postedBy);
                let displayName = '';
                if (user instanceof api.models.userModel) {
                    displayName = user.displayName;
                }
                result.push({
                    _id: strategy._id,
                    createdTime: strategy.createdTime,
                    name: strategy.name,
                    description: strategy.description,
                    granularity: strategy.granularity,
                    isActive: strategy.isActive,
                    postedBy: strategy.postedBy,
                    postedBy_displayName: displayName,
                });
            }
            return result;
        });
    }
}
exports.StrategyService = StrategyService;
//# sourceMappingURL=strategy.service.js.map