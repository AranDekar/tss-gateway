"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require("passport");
const googleStrategy = require("passport-google-oauth");
const api = require("../../../api");
class Google {
    static use() {
        // Use google strategy
        let options = {
            clientID: api.helpers.Config.settings.google.clientId,
            clientSecret: api.helpers.Config.settings.google.clientSecret,
            callbackURL: api.helpers.Config.settings.google.callbackUrl,
        };
        passport.use(new googleStrategy.OAuth2Strategy(options, (accessToken, refreshToken, profile, done) => {
            console.log(`access token is ${accessToken}`);
            // Set the provider data and include tokens
            let providerData = profile._json;
            providerData.accessToken = accessToken;
            providerData.refreshToken = refreshToken;
            // Create the user OAuth profile
            let providerUserProfile = {
                firstName: profile.name ? profile.name.givenName : 'undefined',
                lastName: profile.name ? profile.name.familyName : 'undefined',
                displayName: profile.displayName,
                email: profile.emails && profile.emails.length > 0 ? profile.emails[0].value : 'undefined',
                username: profile.emails && profile.emails.length > 0 ? profile.emails[0].value : 'undefined',
                profileImageURL: (providerData.picture) ? providerData.picture : undefined,
                provider: 'google',
                // providerIdentifierField: 'id',
                providerData: providerData,
            };
            let userService = new api.services.UserService();
            // Save the user OAuth profile
            userService.findOrCreate(providerUserProfile.email, providerUserProfile).then(user => {
                user.save(function (err, doc) {
                    done(err, doc);
                });
            }, error => done(error, null));
        }));
    }
}
exports.Google = Google;
//# sourceMappingURL=google.js.map