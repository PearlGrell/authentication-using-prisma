"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const password_1 = require("../helper/password");
const send_mail_1 = require("../services/send_mail");
class UserModel {
    constructor(user) {
        var _a, _b, _c, _d, _e, _f, _g;
        this.id = (_a = user.id) !== null && _a !== void 0 ? _a : crypto.randomUUID();
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.username = (_b = user.username) !== null && _b !== void 0 ? _b : `${this.email.split('@')[0]}_`;
        this.image = (_c = user.image) !== null && _c !== void 0 ? _c : '';
        this.dob = user.dob;
        this.isVerified = (_d = user.isVerified) !== null && _d !== void 0 ? _d : false;
        this.isLoggedIn = (_e = user.isLoggedIn) !== null && _e !== void 0 ? _e : false;
        this.createdAt = (_f = user.createdAt) !== null && _f !== void 0 ? _f : new Date().toISOString().replace('T', ' ').replace('Z', '');
        this.updatedAt = (_g = user.updatedAt) !== null && _g !== void 0 ? _g : new Date().toISOString().replace('T', ' ').replace('Z', '');
        this.password = user.password;
        this.salt = user.salt;
        this.otp = user.otp;
    }
    setPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            const { salt, hash } = (0, password_1.hash_generator)(password);
            this.salt = salt;
            this.password = hash;
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            this.otp = otp;
            yield (0, send_mail_1.sendMail)({
                to: this.email,
                template: 'registration',
                firstname: this.firstName,
                otp: otp,
                username: this.username,
                password: password
            }).then(() => {
                console.log('Mail sent successfully');
            }).catch((err) => {
                throw new Error(err);
            });
        });
    }
    generateOTP() {
        return __awaiter(this, void 0, void 0, function* () {
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            this.otp = otp;
            this.isVerified = false;
            yield (0, send_mail_1.sendMail)({
                to: this.email,
                template: 'resendOTP',
                firstname: this.firstName,
                otp: otp,
            }).then(() => {
                console.log('Mail sent successfully');
            }).catch((err) => {
                throw new Error(err);
            });
        });
    }
    sendPasswordResetEmail() {
        return __awaiter(this, void 0, void 0, function* () {
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            this.otp = otp;
            yield (0, send_mail_1.sendMail)({
                to: this.email,
                template: 'forgot_password',
                firstname: this.firstName,
                otp: otp
            }).then(() => {
                console.log('Mail sent successfully');
            }).catch((err) => {
                throw new Error(err);
            });
        });
    }
    resetPassword(password, otp) {
        if (this.otp !== otp) {
            throw new Error('Invalid OTP');
        }
        const { salt, hash } = (0, password_1.hash_generator)(password);
        this.salt = salt;
        this.password = hash;
        this.otp = null;
    }
    verifyPassword(password) {
        return (0, password_1.verify_password)(password, this.password, this.salt);
    }
    isUserVerified() {
        return this.isVerified === true;
    }
    isUserLoggedIn() {
        return this.isLoggedIn === true;
    }
    verifyUser() {
        this.isVerified = true;
        this.otp = null;
    }
    loginUser() {
        this.isLoggedIn = true;
    }
    database() {
        return {
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            username: this.username,
            password: this.password,
            dob: this.dob,
            image: this.image,
            isVerified: this.isVerified,
            isLoggedIn: this.isLoggedIn,
            otp: this.otp,
            salt: this.salt,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}
exports.default = UserModel;
//# sourceMappingURL=userModel.js.map