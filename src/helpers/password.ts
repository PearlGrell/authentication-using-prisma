import * as crypto from 'node:crypto';

export const hash_generator = (password: string) => {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return { salt, hash };
}

export const verify_password = (password: string, hash?: string, salt?: string) : boolean | Error => {
    try {
        const hashVerify = crypto.pbkdf2Sync(password, salt!, 1000, 64, 'sha512').toString('hex');
        return hash === hashVerify;
    }
    catch (e) {
        return e as Error;
    }
}