"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api = require("../../api");
class StrategyService {
    async get(strategies) {
        let result = [];
        let userService = new api.services.UserService();
        for (let strategy of strategies) {
            let user = await userService.get(strategy.postedBy);
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
    }
}
exports.StrategyService = StrategyService;
//# sourceMappingURL=strategy.service.js.map