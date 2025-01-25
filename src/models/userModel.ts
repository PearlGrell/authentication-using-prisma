import { hash_generator, verify_password } from '../helper/password';
import { sendMail } from '../services/send_mail';
import { User } from '../types';

class UserModel implements User {
    id?: string;
    name: string;
    username?: string;
    email: string;
    password?: string;
    dob: Date;
    image?: string;
    isVerified?: boolean;
    isLoggedIn?: boolean;
    otp?: string;
    salt?: string;
    createdAt?: Date;
    updatedAt?: Date;

    constructor(user: User) {
        this.id = user.id ?? crypto.randomUUID();
        this.name = user.name;
        this.email = user.email;
        this.username = user.username ?? `${this.email.split('@')[0]}_`;
        this.image = user.image ?? '';
        this.dob = user.dob;
        this.isVerified = user.isVerified ?? false;
        this.isLoggedIn = user.isLoggedIn ?? false;
        this.createdAt = user.createdAt ?? new Date();
        this.updatedAt = user.updatedAt ?? new Date();
        this.password = user.password ?? '';
        this.salt = user.salt ?? '';
        this.otp = user.otp ?? '';
        if(this.salt === '') {
            this.setPassword(`${this.name.replace(' ', '')}@${this.dob.toString().split('-')[0]}`);
        }
    }

    async setPassword(password: string): Promise<void> {
        const { hash, salt } = hash_generator(password);
        this.salt = salt;
        this.password = hash;

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        this.otp = otp;

        await sendMail({
            to: this.email,
            template: 'registration',
            firstname: this.name.split(' ')[0],
            password: password,
            username: this.username,
            otp: otp
        });
    }

    verifyPassword(password: string): boolean {
        return verify_password(password, this.password, this.salt);
    }

    verifyOTP(otp: string): boolean {
        if(this.otp === otp) {
            this.isVerified = true;
            this.otp = null;
            return true;
        }
        return false;
    }

    resetPassword(password: string, otp: string): boolean {
        if(this.otp === otp) {
            const { hash, salt } = hash_generator(password);
            this.salt = salt;
            this.password = hash;
            this.otp = null;
            return true;
        }
        return false;
    }

    async resendOTP(): Promise<void> {
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        this.otp = otp;

        await sendMail({
            to: this.email,
            template: 'resendOTP',
            firstname: this.name.split(' ')[0],
            otp: otp
        });
    }

    async sendPasswordReset(): Promise<void> {
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        this.otp = otp;

        await sendMail({
            to: this.email,
            template: 'forgot_password',
            firstname: this.name.split(' ')[0],
            otp: otp
        });
    }

    toJSON(){
        return {
            id: this.id,
            name: this.name,
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