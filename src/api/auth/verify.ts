import { verify_token } from "../../helpers/token";
import { response } from "../../helpers/response";
import { Context } from "../../types";
import { db } from "../../database/database";
import { users } from "../../database/schema";
import { eq } from "drizzle-orm";
import UserModel from "../../models/user";

export async function verify({req, res} : Context){
    try{
        const { otp } = req.body;

        const token = req.headers.authorization.split(" ")[1];
        if(!token){
            response.error_message(res, "Valid Token Not Found", 401);
            return;
        }

        const id = verify_token(token);

        const data = await db.select().from(users).where(eq(users.id, id)).get();

        if(!data){
            response.error_message(res, "User Not Found", 404);
            return;
        }

        const user = new UserModel(data);

        if(user.otp !== otp){
            response.error_message(res, "Invalid OTP", 400);
            return;
        }

        user.verifyUser();

        await db.update(users).set(user).where(eq(users.id, id)).run();

        response.success(res, "User Verified Successfully", "message");

    }   
    catch(err){
        response.error(res, err);
    }
}

export async function resendOTP({req, res} : Context){
    try{
        const token = req.headers.authorization.split(" ")[1];
        if(!token){
            response.error_message(res, "Valid Token Not Found", 401);
            return;
        }

        const id = verify_token(token);

        const data = await db.select().from(users).where(eq(users.id, id)).get();

        if(!data){
            response.error_message(res, "User Not Found", 404);
            return;
        }

        const user = new UserModel(data);

        if(user.isUserVerified()){
            response.error_message(res, "User Already Verified", 400);
            return;
        }

        await user.generateOTP();

        await db.update(users).set(user).where(eq(users.id, id)).run();

        response.success(res, "OTP Sent Successfully", "message");

    }   
    catch(err){
        response.error(res, err);
    }
}