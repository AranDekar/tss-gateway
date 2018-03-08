import * as jwt from 'jsonwebtoken';
import * as uuid from 'uuid';

import * as api from '../../api';
import * as helpers from '../helpers';

export class JwtTokenService {
    public signToken(user: api.models.UserModel): JwtTokenServiceData {
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
        const options: jwt.SignOptions = {
            expiresIn: helpers.Config.settings.expiration_jwt_minutes * 60,
            issuer: 'tss-gateway',
            jwtid: 'uniqueId',
            subject: user.id.toString(),
        };
        const token = jwt.sign(payload, helpers.Config.settings.jwt_secret, options);

        const result: JwtTokenServiceData = {
            jwt: token,
            xsrf: xsrfToken,
        };

        return result;
    }
    public verifyToken(token: string, next: (err: Error, payload: any) => void) {
        const options: jwt.SignOptions = {
            expiresIn: api.helpers.Config.settings.expiration_jwt_minutes * 60,
            issuer: 'tss-gateway',
            jwtid: 'uniqueId',
        };
        jwt.verify(token, api.helpers.Config.settings.jwt_secret, options, next);
    }
}

interface JwtTokenServiceData {
    jwt: string;
    xsrf: string;
}