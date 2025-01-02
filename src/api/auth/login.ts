import { db } from "../../database/database";
import { users } from "../../database/schema";
import { eq } from "drizzle-orm";
import { response } from "../../helpers/response";
import UserModel from "../../models/user";
import { Context } from "../../types";

export async function login({req, res} : Context){
    try{
        const { email, password } = req.body;

        if(!email || !password){
            response.error_message(res, "Email and Password Required", 400);
            return;
        }

        const data = await db.select().from(users).where(eq(users.email, email)).get();

        if(!data){
            response.error_message(res, "User Not Found", 404);
            return;
        }

        const user = new UserModel(data);

        if(!user.isUserVerified()){
            response.error_message(res, "User Not Verified", 401);
            return;
        }

        if(!user.verifyPassword(password)){
            response.error_message(res, "Invalid Password", 400);
            return;
        }

        user.loginUser();

        await db.update(users).set(user).where(eq(users.id, user.id)).run();

        response.success(res, "User Logged In Successfully", "message");

    }   
    catch(err){
        response.error(res, err.message);
    }
}