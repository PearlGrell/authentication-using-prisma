import { User} from '../types';
import { hash_generator, verify_password } from '../helpers/password';
import { sendMail } from '../services/send_mail';

class UserModel implements User {
    id?: string;
    firstName: string;
    lastName: string;
    username?: string;
    email: string;
    password?: string;
    dob: string;
    image?: string;
    isVerified?: number;
    isLoggedIn?: number;
    otp?: string;
    salt?: string;
    createdAt?: string;
    updatedAt?: string;

    constructor(user: User) {
        this.id = user.id ?? crypto.randomUUID();
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.username = user.username ?? `${this.email.split('@')[0]}_`;
        this.image = user.image ?? '';
        this.dob = user.dob;
        this.isVerified = user.isVerified ?? 0;
        this.isLoggedIn = user.isLoggedIn ?? 0;
        this.createdAt = user.createdAt ?? new Date().toISOString().replace('T', ' ').replace('Z', '');
        this.updatedAt = user.updatedAt ?? new Date().toISOString().replace('T', ' ').replace('Z', '');
        this.password = user.password;
        this.salt = user.salt;
        this.otp = user.otp;
    }

    async setPassword(password: string) {
        const { salt, hash } = hash_generator(password);
        this.salt = salt;
        this.password = hash;

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        this.otp = otp;

        await sendMail({
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
    }

    async generateOTP() {
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        this.otp = otp;
        this.isVerified = 0;

        await sendMail({
            to: this.email,
            template: 'resendOTP',
            firstname: this.firstName,
            otp: otp,
        }).then(() => {
            console.log('Mail sent successfully');
        }).catch((err) => {
            throw new Error(err);
        });
    }

    async sendPasswordResetEmail() {
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        this.otp = otp;

        await sendMail({
            to:this.email,
            template: 'forgot_password',
            firstname: this.firstName,
            otp: otp
        }).then(() => {
            console.log('Mail sent successfully');
        }
        ).catch((err) => {
            throw new Error(err);
        });
    }

    resetPassword(password: string, otp: string) {
        if (this.otp !== otp) {
            throw new Error('Invalid OTP');
        }
        const { salt, hash } = hash_generator(password);
        this.salt = salt;
        this.password = hash;
        this.otp = null;
    }

    verifyPassword(password: string) {
        return verify_password(password, this.password, this.salt);
    }

    isUserVerified() {
        return this.isVerified === 1;
    }

    isUserLoggedIn() {
        return this.isLoggedIn === 1;
    }

    verifyUser() {
        this.isVerified = 1;
        this.otp = null;
    }

    loginUser() {
        this.isLoggedIn = 1;
    }

    database(){
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

export default UserModel;