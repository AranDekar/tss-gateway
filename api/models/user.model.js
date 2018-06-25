"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const validator = require("validator");
const crypto = require("crypto");
let owasp = require('owasp-password-strength-test');
const api = require("../../api");
let mongoose = api.helpers.DataAccess.mongooseInstance;
const validateLocalStrategyProperty = function (property) {
    return ((this.provider !== 'local' && !this.updated) || property.length);
};
const validateLocalStrategyEmail = function (email) {
    return ((this.provider !== 'local' && !this.updated) || validator.isEmail(email));
};
let schema = new mongoose_1.Schema({
    firstName: {
        type: String, trim: true, default: '', validate: [validateLocalStrategyProperty, 'Please fill in your first name'],
    },
    lastName: {
        type: String, trim: true, default: '', validate: [validateLocalStrategyProperty, 'Please fill in your last name'],
    },
    displayName: { type: String, trim: true },
    email: {
        type: String, unique: true, lowercase: true, trim: true, default: '',
        validate: [validateLocalStrategyEmail, 'Please fill a valid email address'],
    },
    username: { type: String, unique: 'Username already exists', required: 'Please fill in a username', lowercase: true, trim: true },
    password: { type: String, default: '' },
    salt: { type: String },
    access_token: { type: String },
    profileImageURL: { type: String, default: 'modules/users/client/img/profile/default.png' },
    provider: { type: String, required: 'Provider is required' },
    providerData: {},
    additionalProvidersData: {},
    roles: { type: [{ type: String, enum: ['user', 'admin'] }], default: ['user'], required: 'Please provide at least one role' },
    updated: { type: Date },
    created: { type: Date, default: Date.now },
    /* For reset password */
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
});
schema.pre('save', function (next) {
    if (this.password && this.isModified('password')) {
        this.salt = crypto.randomBytes(16).toString('base64');
        this.password = this.hashPassword(this.password);
    }
    next();
});
/**
 * Hook a pre validate method to test the local password
 */
schema.pre('validate', function (next) {
    if (this.provider === 'local' && this.password && this.isModified('password')) {
        let result = owasp.test(this.password);
        if (result.errors.length) {
            let error = result.errors.join(' ');
            this.invalidate('password', error);
        }
    }
    next();
});
/**
 * Create instance method for hashing a password
 */
schema.methods.hashPassword = function (password) {
    if (this.salt && password) {
        return crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'base64').toString('base64');
    }
    else {
        return password;
    }
};
/**
 * Create instance method for authenticating user
 */
schema.methods.authenticate = function (password) {
    return this.password === this.hashPassword(password);
};
schema.statics.findUniqueUsername = async function (username, suffix) {
    let _this = this;
    let possibleUsername = username.toLowerCase() + (suffix || '');
    try {
        let user = await _this.findOne({ username: possibleUsername }).exec();
        if (!user) {
            Promise.resolve(possibleUsername);
        }
        else {
            return await _this.findUniqueUsername(username, (suffix || 0) + 1);
        }
    }
    catch (err) {
        Promise.reject(err);
    }
};
schema.statics.findByEmailAddress = async (emailAddress) => {
    return this.userModel.findOne({ email: emailAddress }).exec();
};
exports.userModel = mongoose.model('user', schema);
//# sourceMappingURL=user.model.js.map