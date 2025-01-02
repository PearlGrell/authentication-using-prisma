import { db } from "../../database/database";
import { users } from "../../database/schema";
import { eq } from "drizzle-orm";
import { response } from "../../helpers/response";
import { verify_token } from "../../helpers/token";
import UserModel from "../../models/user";
import { Context } from "../../types";

export async function forgotPassword({ req, res }: Context) {
    try{
        const token = req.headers.authorization?.split(" ")[1];

        if(!token) return response.error(res, "Token is required", 400);

        const id = await verify_token(token);

        const userData =  await db.select().from(users).where(eq(users.id, id)).get();  
        
        if(!userData) return response.error(res, "User not found", 404);

        const user = new UserModel(userData);

        await user.sendPasswordResetEmail();

        await db.update(users).set(user).where(eq(users.id, id)).run();

        response.success(res, "OTP Sent Successfully", "message");
    }
    catch(e){
        console.error(e);
    }
}