"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const uuid = require("uuid");
const api = require("../../api");
const helpers = require("../helpers");
class JwtTokenService {
    signToken(user) {
        if (!user || !user.id) {
            throw new Error('user is not defined to sign the jwt token');
        }
        const userInPayload = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            displayName: user.displayName,
            userName: user.username,
            created: user.created,
            updated: user.updated,
        };
        const xsrfToken = uuid.v1();
        const payload = {
            xsrfToken,
            user: userInPayload,
        };
        const options = {
            expiresIn: helpers.Config.settings.expiration_jwt_minutes * 60,
            issuer: 'tss-gateway',
            jwtid: 'uniqueId',
            subject: user.id.toString(),
        };
        const token = jwt.sign(payload, helpers.Config.settings.jwt_secret, options);
        const result = {
            jwt: token,
            xsrf: xsrfToken,
        };
        return result;
    }
    verifyToken(token, next) {
        const options = {
            expiresIn: api.helpers.Config.settings.expiration_jwt_minutes * 60,
            issuer: 'tss-gateway',
            jwtid: 'uniqueId',
        };
        jwt.verify(token, api.helpers.Config.settings.jwt_secret, options, next);
    }
}
exports.JwtTokenService = JwtTokenService;
//# sourceMappingURL=jwt-token.service.js.map