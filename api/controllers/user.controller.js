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
function getUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.user) {
            res.statusCode = 403; // bad gateway
            next(new Error('user cannot be resolved!'));
        }
        let user = {
            id: req.user.id,
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            displayName: req.user.displayName,
            userName: req.user.userName,
            created: req.user.created,
            updated: req.user.updated,
        };
        res.json(user);
    });
}
exports.getUser = getUser;
//# sourceMappingURL=user.controller.js.map