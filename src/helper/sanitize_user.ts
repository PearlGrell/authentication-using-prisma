import { User } from "../types";

export function sanitize_user(user: User) {
    const { password, salt, otp, createdAt, updatedAt, ...sanitizedUser } = user;
    return sanitizedUser;
}