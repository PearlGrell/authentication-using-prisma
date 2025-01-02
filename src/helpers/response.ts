import { User } from "types";
import { type Response } from "express";

export function sanitize_user( user : User ){
    return {
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        image: user.image,
        dob: user.dob,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };
}

export const response = {
    success<T>(res: Response, data: T, property: string = "data"): void {
        res.status(200).json({ [property]: data });
    },
    
    error(res: Response, error: any, error_code: number = 500): void {
        res.status(error_code).json({ error: error.message });
    },
    
    error_message(res: Response, message: string, error_code: number = 500): void {
        res.status(error_code).json({ error: message });
    },
};
